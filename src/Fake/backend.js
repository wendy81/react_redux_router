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
                            let newUser = JSON.parse(opts.body);

                            // validation
                            let duplicateUser = users.filter(user => {
                                return user.username === newUser.username;
                            }).length;
                            if (duplicateUser) {
                                reject('Username "' + newUser.username + '" is already exist');
                                return;
                            }

                            if (!users.length) {
                            	newUser.id = 0;
                            } else {
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
		                        let responseJson = {
		                            id: user.id,
		                            username: user.username,
		                            token: 'fake-jwt-token'
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
                            if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                                resolve({ ok: true, json: () => users });
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
                            // find if any user matches login credentials
                             if(!(params.id === params.userId)) {
                                users.map( (value, index) => {
                                    if(value.id === params.id) {
                                       users.splice(index, 1);
                                       resolve({ ok: true, json: () => users })
                                       localStorage.setItem('users', JSON.stringify(users)) 
                                    }
                                    return users;
                                });                                
                             } else {
                                reject('Can not Delete Current User.');
                             }
                            return;
                        }                        


                    },500)

           })

    }
}