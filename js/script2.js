
	let costCk = 2;
	let calcActive2 = false;
	let cautionLength2 = 1;
	let cautionText2 = "※보너스는 항상 가장 높은 난이도에서 사용한다고 가정합니다.";
	 
	let cautionTextSet2 = () => {
				  if (cautionLength2 <= cautionText2.length) {
				    let nowText = cautionText2.slice(0, cautionLength2);
				    $(".cautionText2").text(nowText);
				    cautionLength2++;
				    setTimeout(cautionTextSet2, 50);
				  }else{
					  cautionLength2 = 1;
					  return;
				  }
	}
	
$(function(){
	
	
	
	$("button[class^=boBtn]").on("click",function(){
				let val = $(this).data("val");
				$(".boCk").val(val);

				if($(this).hasClass("off4")){
					if(val == "1"){
						$("#boNumber").text("1/3");
					}else if(val == "2"){
						$("#boNumber").text("2/3");
						$(".boBtn1").removeClass("off4");
					}else if(val =="3"){
						$("#boNumber").text("3/3");
						$(".boBtn1").removeClass("off4");
						$(".boBtn2").removeClass("off4");
					}
					$(this).removeClass("off4");
					return;
				}else{
					if(val == "0"){
						$("#boNumber").text("0/3");
						$(".boBtn1").addClass("off4");
						$(".boBtn2").addClass("off4");
						$(".boBtn3").addClass("off4");
					}else if(val == "1"){
						$("#boNumber").text("1/3");
						$(".boBtn2").addClass("off4");
						$(".boBtn3").addClass("off4");
					}else if(val == "2"){
						$("#boNumber").text("2/3");
						$(".boBtn3").addClass("off4");
					}
				}	
			});	
	

	$("button[class^=effihardBtn]").on("click",function(){
			let val = $(this).data("val");
			
			$(".hardNum").val(val);
			if($(this).hasClass("off3")){
				if(val == "1"){
					$("#effihardNumber").text("1/3");
				}else if(val == "2"){
					$("#effihardNumber").text("2/3");
					$(".effihardBtn1").removeClass("off3");
				}else if(val =="3"){
					$("#effihardNumber").text("3/3");
					$(".effihardBtn1").removeClass("off3");
					$(".effihardBtn2").removeClass("off3");
				}
				
				$(this).removeClass("off3");
				
				return;
			}else{
				if(val == "0"){
					$("#effihardNumber").text("0/3");
					$(".effihardBtn1").addClass("off3");
					$(".effihardBtn2").addClass("off3");
					$(".effihardBtn3").addClass("off3");
				}else if(val == "1"){
					$("#effihardNumber").text("1/3");
					$(".effihardBtn2").addClass("off3");
					$(".effihardBtn3").addClass("off3");
				}else if(val == "2"){
					$("#effihardNumber").text("2/3");
					$(".effihardBtn3").addClass("off3");
				}
			}
	});	
	
	$("button[class^=effihardBtn]").on("click", function() {
		$(".effihardCk").val(parseInt($(this).data("val")));
	});
		
//	$(".costCk").on("click",function(){
//
//		costCk = parseInt($(this).val());
//
//		$(".costCk").prop('checked',false);
//		$(this).prop('checked',true);
//		
//	});
	
	$(".resetButton2").on("click",function(){
		
		if(calcActive2){
					return;
				}
				
				$("#fragCountBox2").trigger("click");
				$(".effihardBtn3").trigger("click");
				$(".boBtn3").trigger("click");
				if($(".levelCk").is(":checked")){
					$(".levelCk").trigger("click");
				};
				
				
				$(".needFragmentInput").val(400);
				$(".nowFragmentInput").val(0);
				$(".consumWeek").val(1);
				
				$("#resultBox2").removeClass("resize2");
				$("#textTitle2").text("");	
				$(".playTotalVal").text("");
				$(".playHardVal").text("");
				$(".playlevel1Val").text("");
				$(".playlevel2Val").text("");
				$(".useEnkeVal").text("");

		
	});
		
	$(".resultButton2").on("click", function(){
		
		level1Result = {
						bonus : 15,
						normal : 10
					}
		
		if(calcActive2){
			return;
		}

		$("#textTitle2").text("");	
		$(".playTotalVal").text("");
		$(".playExpVal").text("");
		$(".playHardVal").text("");
		$(".playlevel2Val").text("");
		$(".playlevel1Val").text("");
		$(".useEnkeVal").text("");
		
		if($(".levelCk").is(":checked")){
			$(".playHardVal").hide();
			$(".playlevel2Val").hide();
			$(".playlevel1Val").show();
		}else{
			$(".playHardVal").show();
			$(".playlevel2Val").show();
			$(".playlevel1Val").hide();
		}
		
		calcActive2 = true;
		
		let week = $(".consumWeek").val() != "" ? parseInt($(".consumWeek").val()) : 1;
		if(0 > week){
				week = 1;
		}
		let value = calcEffi(1,week);
		let value2 = calcEffi(2,week);
		let value3 = calcEffi(3,week);

		$("#resultBox2").addClass("resize2");
		
		makingText(value,value2,value3);
		
		
		
	});
	
	let calcEffi = (simulCost,consumWeek) => {
	
		let result = {};
		
		let needVal = $(".needFragmentInput").val() != "" ? parseInt($(".needFragmentInput").val()) : 0;
		if(0 > parseInt($(".needFragmentInput").val())){
			return result = {
								countNum : 0, 
								cost : 0,
								hard : 0,
								level2 : 0,
								level1 : 0,
								exp : 0
							};
	
		}
		console.log(needVal);
		let nowVal = $(".nowFragmentInput").val() != "" ? parseInt($(".nowFragmentInput").val()) : 0;
		if(0>parseInt($(".nowFragmentInput").val())){
			return result = {
								countNum : 0, 
								cost : 0,
								hard : 0,
								level2 : 0,
								level1 : 0,
								exp : 0
							};
		}
		console.log(nowVal);
		let actuNeedNum = 0;
		if(0 >= needVal - nowVal){
			return result = {
								countNum : 0, 
								cost : 0,
								hard : 0,
								level2 : 0,
								level1 : 0,
								exp : 0
							};
		}
		console.log(actuNeedNum);
		actuNeedNum = needVal - nowVal;

		let hardNum =  parseInt($(".effihardCk").val()) * parseInt(consumWeek);
		let bonusNum = parseInt($(".boCk").val()) * parseInt(consumWeek);
		let count = 0;
		let needBox = Math.ceil(Math.ceil( actuNeedNum / 3 ) / simulCost );
		let needExp = needBox * 10;
		let nowExp = 0;
		let needCost = 0;
		
		let playHard = 0;
		let playLevel2 = 0;
		let playLevel1 = 0;
		console.log(hardNum);
		console.log(bonusNum);
		console.log(needBox);
		console.log(needExp);
		let remainBonus = 0;
		if($(".levelCk").is(":checked")){
			if (bonusNum > 0) {
				for(let i =1; i<=bonusNum;i++){
					count++;
					playLevel1++;
					nowExp += level1Result.bonus;
					needCost += level1Cost;

					if(nowExp >= needExp){
						return result = {
							countNum : count, 
							cost : needCost,
							hard : playHard,
							level2 : playLevel2,
							level1 : playLevel1,
							exp : nowExp
						};
					}	
				}
				
				for(let i =1+bonusNum; i<=actuNeedNum;i++){
					count++;
					playLevel1++;
					nowExp += level1Result.normal;
					needCost += level1Cost;

					if(nowExp >= needExp){
						return result = {
							countNum : count, 
							cost : needCost,
							hard : playHard,
							level2 : playLevel2,
							level1 : playLevel1,
							exp : nowExp
						};
					}	
				}
				
			}else{
				
				for(let i = 1; i<=actuNeedNum;i++){
					count++;
					playLevel1++;
					nowExp += level1Result.normal;
					needCost += level1Cost;
					console.log(count);
					if(nowExp >= needExp){
						return result = {
							countNum : count, 
							cost : needCost,
							hard : playHard,
							level2 : playLevel2,
							level1 : playLevel1,
							exp : nowExp
						};
					}	
				}
				
			}
		}
		//하드 횟수 있을 경우
		if (hardNum > 0) {
			console.log("A : " + count);
			//보너스 존재 여부 확인
			if (bonusNum > 0) {
				console.log("B : " + count);
				//보너스보다 하드 이용횟수가 많을 경우
				if (hardNum > bonusNum) {
					console.log("C : " + count);
					for(let i =1; i<=bonusNum;i++){
						count++;
						playHard++;
						nowExp += level2HardResult.bonus;
						needCost += level2HardCost;

						if(nowExp >= needExp){

							return result = {
								countNum : count, 
								cost : needCost,
								hard : playHard,
								level2 : playLevel2,
								level1 : playLevel1,
								exp : nowExp
							};
						}	
					}
					
					for(let i =1; i<= hardNum - bonusNum;i++){
						count++;
						playHard++;
						nowExp += level2HardResult.normal;
						needCost += level2HardCost;
						
						if(nowExp >= needExp){
							return result = {
								countNum : count, 
								cost : needCost,
								hard : playHard,
								level2 : playLevel2,
								level1 : playLevel1,
								exp : nowExp
							};
						}	
					}
	
				//보너스보다 하드 이용횟수가 적을 경우
				} else {
					console.log("D : " + count);
					for(let i =1; i<= bonusNum;i++){
						count++;
						playHard++;
						nowExp += level2HardResult.bonus;
						needCost += level2HardCost;

						if(nowExp >= needExp){
							return result = {
								countNum : count, 
								cost : needCost,
								hard : playHard,
								level2 : playLevel2,
								level1 : playLevel1,
								exp : nowExp
							};
						}	
					}
					
					remainBonus = bonusNum - hardNum;

				}
				
				//하드에 소모 후 보너스 횟수가 남은 경우
				if (remainBonus > 0) {
				//	console.log("E : " + count);
					for(let i =1; i<=remainBonus;i++){
						count++;
						playLevel2++;
						nowExp += level2Result.bonus;
						needCost += level2Cost;
						
						if(nowExp >= needExp){
							return result = {
								countNum : count, 
								cost : needCost,
								hard : playHard,
								level2 : playLevel2,
								level1 : playLevel1,
								exp : nowExp
							};
						}	
					}
				}
				
				for(let i =1+remainBonus; i<=actuNeedNum;i++){
					count++;
					playLevel2++;
					nowExp += level2Result.normal;
					needCost += level2Cost;
					
					if(nowExp >= needExp){
						return result = {
							countNum : count, 
							cost : needCost,
							hard : playHard,
							level2 : playLevel2,
							level1 : playLevel1,
							exp : nowExp
						};
					}	
				}
			}else{
				
				for(let i =1; i<= hardNum;i++){
						count++;
						playHard++;
						nowExp += level2HardResult.normal;
						needCost += level2HardCost;
						
						if(nowExp >= needExp){
							return result = {
								countNum : count, 
								cost : needCost,
								hard : playHard,
								level2 : playLevel2,
								level1 : playLevel1,
								exp : nowExp
							};
						}	
					}
				
				
				for(let i =1+remainBonus; i<=actuNeedNum;i++){
					count++;
					playLevel2++;
					nowExp += level2Result.normal;
					needCost += level2Cost;
					
					if(nowExp >= needExp){
						return result = {
							countNum : count, 
							cost : needCost,
							hard : playHard,
							level2 : playLevel2,
							level1 : playLevel1,
							exp : nowExp
						};
					}	
				}
				
			}

		//하드 횟수가 없을 경우
		} else {
		console.log("F : " + count);

			if (bonusNum > 0) {
				
				for(let i =1; i<=bonusNum;i++){
					count++;
					playLevel2++;
					nowExp += level2Result.bonus;
					needCost += level2Cost;
					
					if(nowExp >= needExp){
						return result = {
							countNum : count, 
							cost : needCost,
							hard : playHard,
							level2 : playLevel2,
							level1 : playLevel1,
							exp : nowExp
						};
					}	
				}
			}
			
			for(let i =1+bonusNum; i<=actuNeedNum;i++){
				count++;
				playLevel2++;
				nowExp += level2Result.normal;
				needCost += level2Cost;
				
				if(nowExp >= needExp){
					return result = {
						countNum : count, 
						cost : needCost,
						hard : playHard,
						level2 : playLevel2,
						level1 : playLevel1,
						exp : nowExp
					};
				}	
			}
		}
	}

	
		let timeoutBlock2 = 0;
		let delay = 17;
		let nowLength = 0;
		let totalText = "";
		let expText = "";
		let hardText = "";
		let level2Text = "";
		let level1Text = "";
		let enkeText = "";

		let makingText = (value,value2,value3) => {

			if(value3.countNum == value.countNum){
				totalText = "거던 예상 플레이 횟수 : " + value3.countNum +"회";
			}else{
				totalText = "거던 예상 플레이 횟수 : " + value3.countNum +" ~ "+value.countNum+"회 [ 평균 : "+ value2.countNum +"회 ]";
			}
				
			if(value3.exp == value.exp){
				expText = "( 예상 획득 경험치 : " + value3.exp.toLocaleString('ko-KR') +" )";
			}else{
				expText = "( 예상 획득 경험치 : "+ value3.exp.toLocaleString('ko-KR') +" ~ "+value.exp.toLocaleString('ko-KR')+ " )";
			}	
			
			if(value3.hard == value.hard){
				hardText = "하드 던전 예상 플레이 횟수 : " + value3.hard +"회";
			}else{
				hardText = "하드 던전 예상 플레이 횟수 : " + value3.hard +" ~ "+value.hard+"회 [ 평균 : "+ value2.hard +"회 ]";	
			}
			
			if(value3.level2 == value.level2){
				level2Text = "2렙 던전 예상 플레이 횟수 : " + value3.level2 +"회";
			}else{
				level2Text = "2렙 던전 예상 플레이 횟수 : " + value3.level2 +" ~ "+value.level2+"회 [ 평균 : "+ value2.level2 +"회 ]";
			}
			
			if(value3.level1 == value.level1){
				level1Text = "1렙 던전 예상 플레이 횟수 : " + value3.level1 +"회";
			}else{
				level1Text = "1렙 던전 예상 플레이 횟수 : " + value3.level1 +" ~ "+value.level1+"회 [ 평균 : "+ value2.level1 +"회 ]";
			}
			
			if(value3.cost == value.level1){
				enkeText = "엔케팔린 모듈 예상 소모량 : " + value3.cost +"개";
			}else{
				enkeText = "엔케팔린 모듈 예상 소모량 : " + value3.cost +" ~ "+value.cost+"개 [ 평균 : "+ value2.cost +"개 ]";
			}

			let typingTextTitle = $("#textTitle2");
			
			typingTextTitle.text("결");
			setTimeout(function () {
				typingTextTitle.text("결과");
				nowLength = 0;
				totalTextSet();
		  }, delay);
		  
		};

		let totalTextSet = () => {
			if (nowLength <= totalText.length) {
		    	let nowText = totalText.slice(0, nowLength);
		    	$(".playTotalVal").html("<div>" + nowText + "</div>");
		    nowLength++;
		    setTimeout(totalTextSet, delay);
		  } else {
				 nowLength = 0;
				 expTextSet();
			   
		  }
		};
		
		
		let expTextSet = () => {
			if (nowLength <= expText.length) {
		    	let nowText = expText.slice(0, nowLength);
		    	$(".playExpVal").html("<div>" + nowText + "</div>");
		    nowLength++;
		    setTimeout(expTextSet, delay);
		  } else {
				 nowLength = 0;
				 if($(".levelCk").is(":checked")){
					typingLevel1Text();
				}else{
					typingHardText();
				}
			   
		  }
		};
		
		
		let typingHardText = () => {
			  if (nowLength <= level2Text.length) {
			    let nowText = hardText.slice(0, nowLength);
			    $(".playHardVal").html("<div>" + nowText + "</div>");
			    nowLength++;
			    timeoutBlock2 += delay;
			    setTimeout(typingHardText, delay);
			  } else{
				  nowLength = 0;
				  typingLevel2Text();
			  }
		};
		
		let typingLevel2Text = () => {
			  if (nowLength <= level2Text.length) {
			    let nowText = level2Text.slice(0, nowLength);
			    $(".playlevel2Val").html("<div>" + nowText + "</div>");
			    nowLength++;
			    timeoutBlock2 += delay;
			    setTimeout(typingLevel2Text, delay);
			  } else{
				  nowLength = 0;
				  typingEnkeText();
			  }
		};
		
		let typingLevel1Text = () => {
			if (nowLength <= level1Text.length) {
			    let nowText = level1Text.slice(0, nowLength);
			    $(".playlevel1Val").html("<div>" + nowText + "</div>");
			    nowLength++;
			    timeoutBlock2 += delay;
			    setTimeout(typingLevel1Text, delay);
			} else{
				nowLength = 0;
				typingEnkeText();
			}
		};
		
		
		let typingEnkeText = () => {
			if (nowLength <= enkeText.length) {
				let nowText = enkeText.slice(0, nowLength);
			    $(".useEnkeVal").html("<div>" + nowText + "</div>");
			    nowLength++;
			    timeoutBlock2 += delay;
			    setTimeout(typingEnkeText, delay);
			} else{
				
				 if($(".levelCk").is(":checked")){
					logTextPageTwo += "<div style='height:20px;'></div><div class='logText'>"+logTextCountPageTwo+"번째 로그</div>"+
					"<div class='logText'>"+totalText+"</div>"+
					"<div class='logText'>"+expText+"</div>"+
					"<div class='logText'>"+level1Text+"</div>"+
					"<div class='logText'>"+enkeText+"</div>";
				}else{
					logTextPageTwo += "<div style='height:20px;'></div><div class='logText'>"+logTextCountPageTwo+"번째 로그</div>"+
					"<div class='logText'>"+totalText+"</div>"+
					"<div class='logText'>"+expText+"</div>"+
					"<div class='logText'>"+hardText+"</div>"+
					"<div class='logText'>"+level2Text+"</div>"+
					"<div class='logText'>"+enkeText+"</div>";
				}
				
				logTextCountPageTwo++;
				$("#logTextBox").html(logTextPageTwo);
	
				localStorage.setItem("logTextTwoDataSave", logTextPageTwo);
				localStorage.setItem("logTextTwoCountSave", logTextCountPageTwo);
				
//				let date = new Date();
//				date.setTime(date.getTime() + 168 * 60 * 60 * 1000); // 7일 동안 유효
//				document.cookie = "logTextTwoDataSave="+encodeURIComponent(logTextPageTwo)+"; expires=" + date.toUTCString();
//				document.cookie = "logTextTwoCountSave="+logTextCountPageTwo+"; expires=" + date.toUTCString();
			
				calcActive2 = false;  
			}
		};



	
	
});

