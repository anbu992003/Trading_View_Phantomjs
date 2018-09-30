
var system = require('system');
var args = system.args;
var symbol = '' ;

if (args.length === 1) 
{
  console.log('Try to pass some arguments when invoking this script!');
  phantom.exit();
} 
else 
{
//  args.forEach(function(arg, i) {
//    console.log(i + ': ' + arg);
//  });

 symbol = args[1]; 
 console.log('ARG[1] : ' + symbol);
 //phantom.exit();

}

var url = 'https://in.tradingview.com/symbols/NSE-' + symbol + '/technicals/';
console.log("Url : " + url);
 
var page = require('webpage').create();
var fs = require('fs');
var re = /Summary\s+NEUTRALSELLBUYSTRONG SELLSTRONG BUY\s+(BUY|STRONG BUY|SELL|STRONG SELL|NEUTRAL)/;

//console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.107 Safari/537.36';


page.onLoadFinished = function() {
      console.log("page load finished");
//      page.render('export.png');
      fs.write('tech_tv.html', page.content, 'w');
      fs.write('tech_tv.txt', page.plainText, 'w');
      
      var str = page.plainText;
      var mat = str.match(re)
      console.log("Match : " + mat);
      if(mat)
      {
		var match = re.exec(str);

	   //      console.log("Match : " + match[0]);
			 console.log("Summary : " + match[1]);
			 fs.write('tv_out1.txt', symbol + ',' + match[1] + "\n" , 'a');
      }
      else
      {
      	  console.log("FAILURE!!!!!");
	      fs.write('match_failed.txt', symbol  + "\n" , 'a');
      }
      
     
            
      phantom.exit();
    };



page.open(url, function(status) {
  console.log("Status: " + status);
  if(status === "success") 
  {  		
		var title = page.evaluate(function() 
		{
	    	return document.title;
		});
	  console.log('Page title is ' + title);	
  }
  else
  {
	  page.render('tech_tv.png');
  }
  
  page.close();
  // phantom.exit();
  
});

