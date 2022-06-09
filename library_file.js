/**
 * Authentication.js
 * @NApiVersion 2.1
 */
define([, 'N/https', 'N/url'],
	function(https, url) {


		function getToken() {

			var details = {
				'grant_type': 'password',
				'tenant_code': 'WALLBOXtest',
				'username': 'wallboxAdmin',
				'Password': '1234'
			};

			var formBody = [];
			for (var property in details) {
				var encodedKey = encodeURIComponent(property);
				var encodedValue = encodeURIComponent(details[property]);
				formBody.push(encodedKey + "=" + encodedValue);
			}
			formBody = formBody.join("&");

			var postRequesttoken = https.post({
				url: 'https://W17Stest.mss.mecalux.com/EasySts/oauth/token',
				headers: {
					"Authorization": "basic TWVjYWx1eDp4NHA3ZzNuMXM5",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept": "*/*",
					"Connection": "keep-alive",
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				body: formBody

			});
			return postRequesttoken;
		}

		return {
			getToken : getToken
		}
	});