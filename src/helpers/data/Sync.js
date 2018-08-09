export default class Sync{

	/**
	 * Iterate through store signalements and sync values with the server
	 */
	syncSignalementsToServer(){
	    for (let signalement in store.state.signalements) {
	        if(signalement.synced !== 1){

	        }
	    }
	}
}