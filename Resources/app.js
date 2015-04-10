// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//

var win1 = Titanium.UI.createWindow({  
    title:'Select Color',
    backgroundColor:'#fff'
});

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tea',
    window:win1
});

var Teas = ['#f5f5dc', '#ffe4b5', '#ffe4c4', '#d2b48c',
'#c3b091', '#926f5b', '#804000', '#654321', '#3d2b1f'];

allRows = [];
var theColours = Ti.UI.createTableView({});

for (var i=0; i<Teas.length; i++) {
	theRow = Ti.UI.createTableView({
		backgroundColor:Teas[i], height:50, TeaColor:Teas[i]
	});
	allRows.push(theRow);
}

theColours.setData(allRows);
win1.add(theColours);

function getVerdict(colour) {
	var indicator = colour.charAt(1);
	var msg;
	// make decision on strength of tea based on second letter of hex color
	switch(indicator) {
		case 'F': msg = 'Milky'; break;
		case 'D': msg = 'Nice'; break;
		case 'C': msg = 'Perfect'; break;
		case '9': msg = 'A Bit Strong'; break;
		case '8': msg = 'Builders tea'; break;
		case '6': msg = 'Send it back'; break;
		case '3': msg = 'No Milk Here'; break;
	}
	return msg;
}

function showTeaVerdict(_args) {
	var teaVerdict = Ti.UI.createWindow({layout:'vertical'});
	
	teaVerdict.backgroundColor = _args;
	teaVerdict.msg = getVerdict(_args);
	var judgement = Ti.UI.createLabel
	({text:teaVerdict.msg, top:'50%'});
	var close = Ti.UI.createButton
	({title:'Choose Again', top:'25%'});
	close.addEventListener('click', function(e)
	{teaVerdict.close();
		//release the resources
		teaVerdict = null;
	});
	
	teaVerdict.add(judgement);
	teaVerdict.add(close);
	teaVerdict.open();
}

theColours.addEventListener('click', function(e)
{showTeaVerdict(e.source.TeaColour);
	});

tab1.add(win1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Camera',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Camera',
    window:win2
});

var options = Titanium.UI.createView({
	layout:'vertical'
});

var showCamera = Titanium.UI.createButton({
	title:'Show Camera'
});

var thePhoto = Titanium.UI.createImageView({
	height:'30%',
	width:'30%'
});

options.add(showCamera);
options.add(thePhoto);
win2.add(options);

function showPhoto(_args){
	thePhoto.setImage(_args.media);
}

showCamera.addEventListener('click', function(e){
	Ti.Media.showCamera({
		animated: true,
		autoHide: true,
		saveToPhotoGallery: true,
		showControls: true,
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
		success: function(e) {showPhoto(e);},
		error: function(e) {alert('There was a problem accessing the camera');}
	});
});

tab2.add(win2);

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
