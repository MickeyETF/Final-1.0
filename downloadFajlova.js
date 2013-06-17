window.appRootDirName = "prijava_ispita";
document.addEventListener("online", onOnline, false);
document.addEventListener("deviceready", onDeviceReady, false);
var korisnicko_ime = window.localStorage.getItem("korisnicko_ime");
var lozinka = window.localStorage.getItem("lozinka");
var pom;

function onOnline()
            {
            pom=1;
            }
            
function onDeviceReady() 
{
	if(pom==1)
	{
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	    if (korisnicko_ime != null && lozinka != null) {
	     downloadFile(korisnicko_ime, lozinka);
	     window.location.replace('pocetna.html');
	   }
	}
	else
	{
		if (korisnicko_ime != null && lozinka != null)
		{
		window.location.replace('pocetna.html');
		}	
	}
}

function fail() {
    //alert("failed to get filesystem");
}

function gotFS(fileSystem) {
    //alert("filesystem got");
    window.fileSystem = fileSystem;
    fileSystem.root.getDirectory(window.appRootDirName, {
        create: true,
        exclusive: false
    }, dirReady, fail);
}

function dirReady(entry) {
    window.appRootDir = entry;
    //alert("application dir is ready");
}
downloadFile = function (br_ind, loz) {
    alert("Osvezava se baza podataka");
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
}
