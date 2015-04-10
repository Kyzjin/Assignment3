// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
(function() {
	var win1 = Titanium.UI.createWindow({  
    title:'Select Color',
    backgroundColor:'#fff'
});
//open window
win1.open();
})();

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
{showTeaVerdict(e.source.TeaColour)});

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Map',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Map',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'Insert GPS Map Here',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
