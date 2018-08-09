/*
|--------------------------------------------------------------------------
| Local
|--------------------------------------------------------------------------
| 
| Handle data exchange between the store and local storage
| 
*/

let Local = {


	/**
	 * Save one or all keys from store to local storage.
	 * @param  {string|null} key
	 * @return {Promise}
	 */
	get(key)
	{
		if(key){
			return new Promise((resolve, reject) => {
				localforage.getItem(key)
					.then( (value) => {

						if(value){
							store[key] = value;
							resolve(value);
						}
						else{
							reject(value);
						}
							
					})
					.catch( (err) => {
						reject(err);
					});

			});
		}

		return localforage.iterate( (value, key, iterationNumber) => {
			store[key] = value ;
		});
	},
	

	/**
	 * Save one or all keys from store to local storage.
	 * @param  {string|null} key
	 */
	save(key)
	{
		if (key) {
			localforage.setItem(key,store[key]);
			return;
		}

		for (let key in store) {
			if (key != "authenticated"){
				localforage.setItem(key,store[key]);
			}
		}
	},

	/**
	 * Save one or all local storage keys.
	 * @param  {string|null} key
	 */
	clear(key)
	{
		if (key) {
			localforage.removeItem(key);
			return;
		}

		localforage.clear();
	}



};
export default Local;