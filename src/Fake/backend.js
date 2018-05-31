// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function(url, opts) {
            return new Promise((resolve, reject) => {
                    // wrap in timeout to simulate server api call
                    setTimeout(() => {
                    	//get datas
                    	 if (url.endsWith('.json')) {
                             // respond 200 OK
                            resolve(realFetch(url));
                            return;
                    	 }
                        // register user
                        if (url.endsWith('/users/register') && opts.method === 'POST') {
                            // get new user object from post body
                            let initial = {id:0};
                            let getUser = JSON.parse(opts.body);
                            let newUser = {...initial, ...getUser};

                            // validation
                            let duplicateUser = users.filter(user => {
                                return user.username === newUser.username;
                            }).length;

                            if (duplicateUser) {
                                reject('Username "' + newUser.username + '" is already exist');
                                return;
                            }

                            if (users.length) {
                            	// save new user
                            	newUser.id = Math.max(...users.map(user => user.id)) + 1;
                            }
                            
                            users.push(newUser);
                            localStorage.setItem('users', JSON.stringify(users));

                            // respond 200 OK
                            resolve({
                                ok: true,
                                json: () => (newUser)
                            });

                            return;
                        }

		                // authenticate
		                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
		                    // get parameters from post request
		                    let params = JSON.parse(opts.body);
		                    // find if any user matches login credentials
		                    let filteredUsers = users.filter(user => {
		                        return user.username === params.username && user.password === params.password;
		                    });

		                    if (filteredUsers.length) {
		                        // if login details are valid return user details and fake jwt token
		                        let user = filteredUsers[0];
                                let token = 'fake-jwt-token' + ' ' + user.id
		                        let responseJson = {
		                            id: user.id,
		                            username: user.username,
		                            token: token
		                        };
		                        resolve({
		                            ok: true,
		                            json: () => responseJson
		                        });
		                    } else {
		                        // else return error
		                        reject('Username or password is incorrect');
		                    }
		                    return;
		                }
                        // getAll
                        if (url.endsWith('/lists') && opts.method === 'GET') {
                            if (opts.headers && opts.headers.Authorization) {

                                let Authorization = opts.headers.Authorization;
                                let tokenId = Authorization.split(" ")[2]
                                let filteredUsers = users.filter(user => {
                                    return user.id === Number(tokenId);
                                });
                                let user = filteredUsers[0];
                                let usersAddUser = {users, user}

                                resolve({ ok: true, json: () => usersAddUser });

                            } else {
                                // return 401 not authorised if token is null or invalid
                                reject('Unauthorised');
                            }
                            return;
                        }
                        // delList
                        if (url.endsWith('/delList') && opts.method === 'POST') {
                            // get parameters from post request
                            let params = JSON.parse(opts.body);
                             if(!(params.id === params.userId)) {
                                users.map( (value, index) => {
                                    if(value.id === params.id) {
                                       users.splice(index, 1);
                                       resolve({ ok: true, json: () => value })
                                       localStorage.setItem('users', JSON.stringify(users)) 
                                    }
                                    return users;
                                }); 

                             } else {
                                reject('Can not Delete Current User.');
                             }
                        }

                        // editList
                        if (url.endsWith('/editList') && opts.method === 'POST') {

                            // get parameters from post request
                            let params = JSON.parse(opts.body);
                            // find if any user matches ID credentials
                            let filteredUsers = users.filter(user => {
                                return user.id === params.id;
                            });
                            
                            if (filteredUsers.length) {
                                filteredUsers[0].username = params.textContent;
                                localStorage.setItem('users', JSON.stringify(users)) 
                            }

                            if(params.id === params.userId) {
                                let getUser = JSON.parse(localStorage.getItem('user'))
                                getUser.username = params.textContent;
                                localStorage.setItem('user', JSON.stringify(getUser))
                            }

                            resolve({ ok: true, json: () => users })
                            // if(!filteredUsers.length || !(params.id === params.userId)){
                            //     reject('Edit Data Failure.');
                            // }
                            return;
                        }

                    },500)

           })

    }
}