
	var responseVal = ''; // placeholder

	//Função que faz a requisição e recebe os dados via http
	function rpcCall(type, rpc, optInfoMsg, data, callback) {

        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            //WiFiPortal.Error.show('Unable to create an XMLHttpRequest, try to manually set');
            return callback( false );
        }

        if( optInfoMsg !== undefined && optInfoMsg ){
            //WiFiPortal.Info.show(optInfoMsg);
        }

        httpRequest.onreadystatechange = function () {

            if (httpRequest.readyState !== XMLHttpRequest.DONE) {
                console.log('rpcCall httpRequest readyState is NOT done!', httpRequest.readyState );
                return false;
            }			
            if (httpRequest.status !== 200) {
                console.log( 'rpcCall httpRequest status is NOT 200!', httpRequest );
				//alert("Error saving data to device!");	

                if( httpRequest.responseText && httpRequest.responseText.length > 0 ){
                    //WiFiPortal.Error.show( "Error from device ( " + httpRequest.responseText + " ) -- Please try again");
                    callback(true);
                } else {
                    callback(false);
                }
                return;
            } 
			else{
			  //alert("Save success !");			
			}
			//alert("Save success ! Reboot...");	
            console.log('responseText', httpRequest.responseText);
            var httpResponse = JSON.parse(httpRequest.responseText);
            console.log('httpResponse', httpResponse);

            callback(httpResponse);
        };

        // httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.open(type, '/rpc/' + rpc );
        httpRequest.setRequestHeader("Content-Type", "application/json"); // must be after open
        httpRequest.send(JSON.stringify(data));
  };
	
	//Faz a formatação correta do arquivo json para imprimir na pagina
    function highlight(json){
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    };
	
	//Função chamada após o evento de onclick do botão, chamando as funções de request http
    function myFunction(callback, infoMessage) {

	   document.getElementById("response").innerHTML = responseVal ? responseVal : '';

        rpcCall('GET', 'Sys.GetInfo', infoMessage ? infoMessage : false, false, function (resp) {
            var responseVal = 'Error'; // placeholder

            if (resp && resp !== true ) {
                var jsonResponse = resp.wifi ? resp.wifi : resp;
                var stringifyJson = JSON.stringify(jsonResponse, undefined, 2);
                var obj = JSON.parse(stringifyJson);
                //responseVal = highlight(stringifyJson);
            } else {
                responseVal = "Unable to get info from device!";
            }
            document.getElementById("demo").innerHTML = obj.sta_ip + "/n" + obj.ap_ip +"/n" + obj.status + "/n" + obj.ssid;
            //document.getElementById("response").innerHTML = responseVal ? responseVal : '';
            // Need to check if function since this is called by event handler
            if ( typeof callback === "function" ) {
                callback( resp );
            }
        });
	  };
	
	//Função que salva os dados de ssid e password no esp8266
	function save_cb(){
	  var ssid = document.getElementById('ssid').value || '';
      var pass = document.getElementById('pass').value || '';
      var data = {
        config: {
          wifi: {
		    ap: { enable: false },
            sta: { enable: true, ssid: ssid, pass: pass}
          }
        }
      };
	  rpcCall('POST', 'Config.Set', 'mensage', data, function( resp ){});
      //rpcCall('POST', 'Config.Save', {reboot: true}, function( resp ){});
	  var r = confirm("Successful! reboot the device to apply the changes...");
      if (r == true)
      {
	   window.location.reload();
	   rpcCall('POST', 'Sys.Reboot', false, function( resp ){});
      }
  };
	
	//Função para reiniciar o esp
	function reboot(){	  
	  rpcCall('POST', 'Sys.Reboot', false, function( resp ){});
	  alert("reboot success !");
      window.location.reload();
  };

  function jason_parse (){
    var txt = '{"name":"John", "age":30, "city":"New York"}'
    var obj = JSON.parse(txt);
    document.getElementById("demo").innerHTML = obj.name + ", " + obj.age;

  };