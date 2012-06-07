// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var data = []
var tableView = Ti.UI.createTableView({
	data:data
});

function updateTimeline(timeline){
	var currentData = [];
	for(var i = 0; i < timeline.length; i++){
		var tweet = timeline[i];
		var row = Ti.UI.createTableViewRow(
			{
				height: 150,
				layout: 'absolute'
			}
		);
		var imageView = Ti.UI.createImageView(
			{
				image: tweet.user.profile_image_url,
				width: 48,
				height: 48,
				top: 5,
				left: 5
			}
		);
		row.add(imageView);
		
		var nameLabel = Ti.UI.createLabel(
			{
				width: 120,
				height: 12,
				left: 58,
				top: 5,
				fontSize: 6,
				fontWeight: 'bold',
				color: '#2b4771'
			}
		);
		nameLabel.text = tweet.user.screen_name;
		row.add(nameLabel);
		
		var commentLabel = Ti.UI.createLabel(
			{
				width: 257,
				left: 58,
				top: 18,
				height: 100,
				fontSize: 8
			}
		);
		commentLabel.text = tweet.text;
		row.add(commentLabel);
		var dateLabel = Ti.UI.createLabel(
			{
				width: 200,
				height: 12,
				left: 58,
				bottom: 8,
				fontSize: 6
			}
		);
		dateLabel.text = tweet.created_at;
		row.add(dateLabel);
		
		
		currentData.push(row);
	}
	tableView.setData(currentData);
}

var xhr = Ti.Network.createHTTPClient();
var user = 'kimihito_';
var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + user;
xhr.open('GET',url);
xhr.onload = function(){
	var timeline = JSON.parse(this.responseText);
	updateTimeline(timeline);
};
xhr.send();

win1.add(tableView);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
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
