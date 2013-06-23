window.appRootDirName = "prijava_ispita";
var br_indeksa;
var lozinka;
var pom;
function startIndex()
	{
	document.addEventListener("deviceready", onDeviceReady, false);
	}  
function onDeviceReady() 
	{	
		br_indeksa = window.localStorage.getItem("br_indeksa");
		lozinka = window.localStorage.getItem("lozinka");
		if(br_indeksa!=null && lozinka!=null)
		{
			checkConnection();
			if(pom==1)
			{
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
			provjeraServera();
			
			}
			else
			{
			window.location.replace('pocetna.html');
			}
		}
	}

function fail() {
    //alert("failed to get filesystem");
}

function gotFS(fileSystem) 
	{
		//alert("filesystem got");
		window.fileSystem = fileSystem;
		fileSystem.root.getDirectory(window.appRootDirName, {
        create: true,
        exclusive: false
		}, dirReady, fail);
	}

function dirReady(entry) 
	{
		window.appRootDir = entry;
		//alert("application dir is ready");
	}
function checkConnection() 
	{
        var networkState = navigator.connection.type;
        if(networkState=="wifi")
		{
		pom=1;
		}
	}
function provjeraServera()		
	{
		adresa="http://wstest.etf.unssa.rs.ba/studenti/status/etf/"+br_indeksa+"/"+lozinka;
			$.ajax({
			url:adresa,
			type:"GET",
			timeout:10000,
			crossDomain: true,
			dataType:"jsonp",
			success: function(data)
				{
					
					if(data!="")
					{
					downloadFile();
					}	
				}
			});	
	}
function downloadFile() 
	{
		playBeep();
		var url = new Array();
		url[0] = "http://wstest.etf.unssa.rs.ba/studenti/nepolozeni_ispiti/etf/" + br_indeksa + "/" + lozinka;
		url[1] = "http://wstest.etf.unssa.rs.ba/studenti/polozeni_ispiti/etf/" + br_indeksa + "/" + lozinka;
		url[2] = "http://wstest.etf.unssa.rs.ba/studenti/ispiti/etf/" + br_indeksa + "/" + lozinka;
		url[3] = "http://wstest.etf.unssa.rs.ba/studenti/status/etf/" + br_indeksa + "/" + lozinka;
		var file = new Array();
		file[0] = "/nepolozeni_ispiti.json";
		file[1] = "/polozeni_ispiti.json";
		file[2] = "/ispiti_za_polaganje.json";
		file[3] = "/status_studenta.json";
		for (var i = 0; i < 4; i++) {
			var fileTransfer = new FileTransfer();
			var adresa = url[i].toString();
			var ime_fajla = file[i].toString();
			//alert(adresa);
			//alert(ime_fajla);
			var filePath = window.appRootDir.fullPath + ime_fajla;
			fileTransfer.download(
				adresa,
				filePath, function (entry) {
				//alert("download complete: " + entry.fullPath);
			}, function (error) {
            //alert("download error" + error.source);
			});
		}
		window.location.replace('pocetna.html');
	}
function playBeep() 
	{
        navigator.notification.beep(1);
	}
