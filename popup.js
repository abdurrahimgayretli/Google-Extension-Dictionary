$(function(){
	var i = 0;
	var alerttime = 0;
	var word1 = [];
	var word2 = [];
	var opt;
	chrome.storage.sync.get('alerttime',function(budget){
        if(budget.alerttime > 0){
			alerttime = budget.alerttime;
		}	
	});
	chrome.storage.sync.get('i',function(budget){
		if(budget.i > 0){
			i = budget.i;
		}		
	});
	chrome.storage.sync.get('word1',function(budget){
		if(budget.word1 != null){
			word1 = word1.concat(budget.word1);
			for(var a = 0; a < i; a++){
				if(word1[a] != null){
					opt = document.createElement("option");
					document.getElementById("addlist").options.add(opt);
					opt.text = word1[a];
					opt.value = word1[a];
				}				
			}
		}
		
	});
	chrome.storage.sync.get('word2',function(budget){
		if(budget.word2 != null){
			word2 = word2.concat(budget.word2);
		}
	});
	$('#selecttime').click(function(){
		
		alerttime = $('#alerttime').val();
		chrome.storage.sync.set({'alerttime': alerttime});
	});
	$('#addDic').click(function(){
		
		chrome.storage.sync.get('words',function(budget){
				
			tdic = $('#tdic').val();	
			edic = $('#edic').val();
			
			if((tdic != "" ) && (edic != "")){
				word1.push(tdic);
				word2.push(edic);
						
				opt = document.createElement("option");
				document.getElementById("addlist").options.add(opt);
				opt.text = document.getElementById('tdic').value;
				opt.value = document.getElementById('tdic').value;
				chrome.storage.sync.set({'word1': word1});
				chrome.storage.sync.set({'word2': word2});
				i = i + 1;
				chrome.storage.sync.set({'i': i});			
				
			}
			$('#tdic').val('');
			$('#edic').val('');
			
		});
	});

	$('#delword').click(function(){		
		var silSelect=document.getElementById("addlist");
		word2.splice(word1.indexOf($('#addlist').val()),1);
	    word1.splice(word1.indexOf($('#addlist').val()),1);
		silSelect.remove(silSelect.selectedIndex);
		i = i - 1;
		chrome.storage.sync.set({'i': i});
		chrome.storage.sync.set({'word1': word1});
		chrome.storage.sync.set({'word2': word2});		
	});

});

