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
		}).setHeader("<em class='notifications'> Notification </em>");
	}

	alert(message: string){
		alertify.alert(message).setHeader("<em class='notifications_red'> Error </em>");
	}

	success(message: string){
		alertify.success(message);
	}

	error(message: string){
		alertify.error(message);
	}

	warning(message: string){
		alertify.warning(message);
	}

	message(message: string){
		alertify.message(message);
	}
}
