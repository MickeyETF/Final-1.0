window.appRootDirName = "prijava_ispita";
function onLoad()
             {
             	document.addEventListener("online", onOnline, false);
                document.addEventListener("deviceready", onDeviceReady, false);
             }
var korisnicko_ime=window.localStorage.getItem("korisnicko_ime");
var lozinka=window.localStorage.getItem("lozinka");
var pom;

function onOnline()
            {
            pom=1;
			$("#odjava").css({display: "block"});
            }
            
function onDeviceReady() 
{
	if(korisnicko_ime!="" && lozinka!="")
	{
		if(pom==1)
		{
			console.log("Imate internet konekciju");
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
			if (korisnicko_ime != null && lozinka != null) {
			 loadingAjax(korisnicko_ime, lozinka);
			 window.location.replace('pocetna.html');
		   }
		}
		else
		{
			console.log("Nemate internet konekciju");
			if (korisnicko_ime != null && lozinka != null)
			{
			window.location.replace('pocetna.html');
			}	
	}	}
}

function fail() {
    console.log("failed to get filesystem");
}

function gotFS(fileSystem) {
    console.log("filesystem got");
    window.fileSystem = fileSystem;
    fileSystem.root.getDirectory(window.appRootDirName, {
        create: true,
        exclusive: false
    }, dirReady, fail);
}

function dirReady(entry) {
    window.appRootDir = entry;
    console.log("application dir is ready");
}
downloadFile = function (br_ind, loz) {
    console.log("Osvezava se baza podataka");
    var url = new Array();
    url[0] = "http://wstest.etf.unssa.rs.ba/studenti/nepolozeni_ispiti/etf/" + br_ind + "/" + loz;
    url[1] = "http://wstest.etf.unssa.rs.ba/studenti/polozeni_ispiti/etf/" + br_ind + "/" + loz;
    url[2] = "http://wstest.etf.unssa.rs.ba/studenti/ispiti/etf/" + br_ind + "/" + loz;
    url[3] = "http://wstest.etf.unssa.rs.ba/studenti/status/etf/" + br_ind + "/" + loz;
    var file = new Array();
    file[0] = "/nepolozeni_ispiti.json";
    file[1] = "/polozeni_ispiti.json";
    file[2] = "/ispiti_za_polaganje.json";
    file[3] = "/status_studenta.json";
    for (var i = 0; i < 4; i++) {
        var fileTransfer = new FileTransfer();
        var adresa = url[i].toString();
        var ime_fajla = file[i].toString();
        var filePath = window.appRootDir.fullPath + ime_fajla;
        fileTransfer.download(
            adresa,
            filePath, function (entry) {
        }, function (error) {
        });
    }
}
function loadingAjax(korisnicko_ime,lozinka)
			{
				var adresa="http://wstest.etf.unssa.rs.ba/studenti/status/etf/"+korisnicko_ime+"/"+lozinka;
				$.ajax({
				  url:adresa,
				  type:"GET",
				  crossDomain: true,
				  dataType:"jsonp",
				  success: function(data)
				  {
					if(data!="")
					{
					downloadFile(korisnicko_ime, lozinka);
					}
					else
					{
					console.log("Server nije vratio podatke");
					}
				  }
				});
			}
