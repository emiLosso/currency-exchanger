import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable()
export class AlertifyService {

  constructor() { }

	confirm(message: string, onCallback: () => any){
		alertify.confirm(message, function (e) {
		    if (e) {
		    	onCallback()
		        // user clicked "ok"
		    } else {
		        // user clicked "cancel"
		    }
		});
	}

	alert(message: string){
		alertify.alert(message);
	}

}
