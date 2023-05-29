
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
		
	$(".costCk").on("click",function(){
		
		costCk = parseInt($(this).val());

		$(".costCk").prop('checked',false);
		$(this).prop('checked',true);
		
	});
	
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
		
		if(calcActive2){
			return;
		}
		
		$("#textTitle2").text("");	
		$(".playTotalVal").text("");
		$(".playHardVal").text("");
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
		let value = calcEffi(costCk,week);

		$("#resultBox2").addClass("resize2");
		
		makingText(value);
		
		
		
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
		if(0 <= needVal - nowVal){
			return result = {
								countNum : 0, 
								cost : 0,
								hard : 0,
								level2 : 0,
								level1 : 0,
								exp : 0
							};
		}
		
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
			//console.log("A : " + count);
			//보너스 존재 여부 확인
			if (bonusNum > 0) {
				//console.log("B : " + count);
				//보너스보다 하드 이용횟수가 많을 경우
				if (hardNum > bonusNum) {
					//console.log("C : " + count);
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
					// console.log("D : " + count);
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
			}

		//하드 횟수가 없을 경우
		} else {
		//	console.log("F : " + count);

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
		let delay = 30;
		let nowLength = 0;
		let totalText = "";
		let hardText = "";
		let level2Text = "";
		let level1Text = "";
		let enkeText = "";

		let makingText = (value) => {

			totalText = "거울 던전 총 횟수 : " + value.countNum +"회 ( 획득 예상 경험치 : "+ value.exp.toLocaleString('ko-KR') +" )";
			hardText = "하드 던전 플레이 횟수 : " + value.hard +"회";
			level2Text = "2렙 던전 플레이 횟수 : " + value.level2 + "회";
			level1Text = "1렙 던전 플레이 횟수 : " + value.level1 + "회";
			enkeText = "소모 엔케팔린 모듈 : " + value.cost + "개";
			
			let typingTextTitle = $("#textTitle2");
			
			typingTextTitle.text("결");
			setTimeout(function () {
				typingTextTitle.text("결과");
				nowLength = 0;
				timeoutBlock2 += delay;
				totalTextSet();
		  }, delay);
		  
		};

		let totalTextSet = () => {
			if (nowLength <= totalText.length) {
		    	let nowText = totalText.slice(0, nowLength);
		    	$(".playTotalVal").html("<div>" + nowText + "</div>");
		    nowLength++;
		    timeoutBlock2 += delay;
		    setTimeout(totalTextSet, delay);
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
				calcActive2 = false;  
			}
		};



	
	
});
