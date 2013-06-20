window.appRootDirName = "prijava_ispita";

var br_indeksa = window.localStorage.getItem("br_indeksa");
var lozinka = window.localStorage.getItem("lozinka");
var pom;

function onLoad()
{
document.addEventListener("online", onOnline, false);
document.addEventListener("deviceready", onDeviceReady, false);
}
function onOnline()
            {
            alert("Ima konekcije");
            pom=1;
	$("#odjava").css({display: "block"});
            }
            
function onDeviceReady() 
{
	if(pom==1)
	{
	alert("ispitao konekciju");
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		loadingAjax();
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
function loadingAjax()
			
			{
			alert("Izvrsavam loading ajax");
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
							alert("pozivam download ");
						downloadFile();
						}	
					}
					});
				
			}
function downloadFile() 
{
    alert("Osvezava se baza podataka");
    var url = new Array();
    url[0] = "http://wstest.etf.unssa.rs.ba/studenti/nepolozeni_ispiti/etf/" + br_indeksa + "/" + loz;
    url[1] = "http://wstest.etf.unssa.rs.ba/studenti/polozeni_ispiti/etf/" + br_indeksa + "/" + loz;
    url[2] = "http://wstest.etf.unssa.rs.ba/studenti/ispiti/etf/" + br_indeksa + "/" + loz;
    url[3] = "http://wstest.etf.unssa.rs.ba/studenti/status/etf/" + br_indeksa + "/" + loz;
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
