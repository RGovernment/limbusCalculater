	if(navigator.userAgent.toLowerCase().includes("mobile")){
		$('body').css('zoom', '0.5'); 
		$(".warningText").show();
		
		$(".input-group").html('<div><label class="twoLabel" for="two">던전 2 시행횟수 </label>'+
					'<input type="number" value=0 id="two" class="tryLevel2Num" />' +
					'<div style="margin-top:8px;margin-bottom:15px;">하드 횟수를 수치에 포함 <input class="sumCk" id="checkBox" type="checkbox" hidden=""/>'+
					'<label for="checkBox" style="transform: translateY(27%);"></label></div>'+
				'</div><br><div>'+
					'<label class="oneLabel"for="one">던전 1 시행횟수 </label>'+
					'<input type="number" id="one" value=0 class="tryLevel1Num" />'+
					'<div style="margin-top:8px;margin-bottom:15px;">시즌1 수치로 계산 <input class="seasonCk" id="seasonCk" type="checkbox" hidden=""/>'+
					'<label for="seasonCk" style="transform: translateY(27%);"></label></div></div>');
		
		$(".calTitle1").html("경험치<br>계산기");
		$(".calTitle2").html("파편<br>계산기");
		$(".QnaModal").css("width","70%");
		$(".QnaModal").css("left","10%");
		$(".logRemoveBtn").removeClass("limBtn");
		$(".logRemoveBtn").addClass("limBtnSmall");
	}
	
		
		let calcActive = false;
		let nowPage = 1;
		let nowPageActive = false;
		let nowZoom = 1.5;
		let firstHardCk = 1;
		let madness = 250;
		let level2HardCost = 18;
		let level2Cost = 5;
		let level1Cost = 3;

		let level2HardResult = {
			bonus : 25,
			normal : 150
		};

		let level2Result = {
			bonus : 45,
			normal : 30
		}

		let level1Result = {
			bonus : 15,
			normal : 10
		}
		
		let logTextPageOne = "";
		let logTextCountPageOne = 1;
		let logTextPageTwo = "";
		let logTextCountPageTwo = 1;	
		
		if(localStorage.getItem("logTextOneDataSave") != null){
			
			logTextPageOne = localStorage.getItem("logTextOneDataSave");
			logTextCountPageOne = parseInt(localStorage.getItem("logTextOneCountSave"));
			logTextPageTwo = localStorage.getItem("logTextTwoDataSave");
			logTextCountPageTwo = parseInt(localStorage.getItem("logTextTwoCountSave"));
			
			$("#logTextBox").html(logTextPageOne);
			
		}
		
	
		
		
//		let cookies = document.cookie.split("; ");
//		for (let i = 0; i < cookies.length; i++) {
//		  let cookie = cookies[i].split("=");
//		  if (cookie[0] === "logTextOneDataSave") {
//			  console.log(cookie[1]);
//		    logTextPageOne = cookie[1];
//		  }
//		}

//기본 설정
$(function() {
			let cautionLength = 1;
			let cautionText = "※보너스는 항상 가장 높은 난이도에서 사용한다고 가정합니다."; 			
			
			$(".changeBtn").on("click",function(){
				if(nowPageActive){
					return;
				}
				if(nowPage == 1 ){
					
					nowPageActive = true;
					
					//페이지1 클로즈 액션 클래스 주입
					
					//도움말 켜져있을 경우 제거
					$(".QBtn").removeClass("activeBtn");
					$(".QnaModal").addClass("close");
					
					if($("#logBox").hasClass("active5")){
						$(".logBtn").removeClass("activeBtn");
						$("#logBox").removeClass("active5");
						$("#logBox").addClass("close2");
					}
					
					if(navigator.userAgent.toLowerCase().includes("mobile")){
						$(".QnaModal").removeClass("activeMobile3");
					}else{
						$(".QnaModal").removeClass("active3");
					}
					
					//보너스 횟수 플렉스 박스 숨기기
					$(".flexContainer").each(function() {
						$(this).addClass('change');
						$(this).removeClass('active');
					});
					
					//인풋박스 숨기기
					$(".input-group").addClass('change2');
					$(".input-group").removeClass('active2');
										
					//경고문구 없애기
					$(".cautionText").addClass('change3');
					
					//초기화 / 계산 버튼 변경
					$(".btn-grp").addClass("change4");
					$(".btn-grp").removeClass('active4');
					
					//결과 박스 resize 제거
					$("#resultBox").removeClass("resize");
					
					//--//
					
					setTimeout(function(){
						
						$(".boxCon").hide();
						$(".boxCon2").show();
						$(".modalContent").hide();
						$(".modalContent2").show();
						
						//페이지2 오픈 액션 클래스 주입
						
						//하드던전 횟수
						$(".flexContainer2").addClass('active');
						
						//초기화, 계산 버튼
						$(".btn-grp2").addClass('active4');
						
						//인풋 박스 등장
						$(".input-group2").addClass('active2');

						//텍스트 타이핑
						cautionTextSet2();
						
						//로그 텍스트 페이지2 사양으로 변경
						$("#logTextBox").html(logTextPageTwo);
						//
						
						
						//페이지1 변환 액션 클래스 모두 제거
						$(".flexContainer").removeClass('change');
						$(".input-group").removeClass('change2');
						$(".btn-grp").removeClass("change4");
						$(".cautionText").removeClass('change3');
						$(".cautionText").text("");
						$("#textTitle").text("");
						$(".calcVal").text("");
						$(".enkeVal").text("");
						$(".madVal").text("");
						//
						
						

						nowPageActive = false;
						nowPage = 2;
					},601);
					
				}else if(nowPage == 2){
					nowPageActive = true;
					
					//페이지2 클로즈 액션 클래스 주입
					$(".flexContainer2").addClass('change');
					$(".flexContainer2").removeClass('active');
					
					//초기화 / 계산 버튼 변경
					$(".btn-grp2").addClass("change4");
					$(".btn-grp2").removeClass('active4');
					
					//인풋박스 숨기기
					$(".input-group2").addClass('change2');
					$(".input-group2").removeClass('active2');
					
					//결과 박스 resize 제거
					$("#resultBox2").removeClass("resize2");
					
					//도움말 켜져있을 경우 제거
					$(".QBtn").removeClass("activeBtn");
					$(".QnaModal").addClass("close");
					
					if($("#logBox").hasClass("active5")){
						$(".logBtn").removeClass("activeBtn");
						$("#logBox").removeClass("active5");
						$("#logBox").addClass("close2");
					}

					$(".QnaModal").removeClass("close");
					if(navigator.userAgent.toLowerCase().includes("mobile")){
						$(".QnaModal").removeClass("activeMobile3");
					}else{
						$(".QnaModal").removeClass("active3");
					}

					//텍스트 삭제
					$(".cautionText2").addClass('change3');
					//
						
						
					setTimeout(function(){
						$(".boxCon").show();
						$(".boxCon2").hide();
						$(".modalContent").show();
						$(".modalContent2").hide();
						
						
						//로그 텍스트 페이지1 사양으로 변경
						$("#logTextBox").html(logTextPageOne);
						//
						
						
						//페이지1 오픈 액션 클래스 주입
						$(".flexContainer").each(function() {
							$(this).addClass('active');
						});
						$(".btn-grp").addClass('active4');
						$(".input-group").addClass('active2');
						cautionTextSet();
						//
						
						//페이지2 화면 액션 클래스 제거
						$(".flexContainer2").removeClass('change');
						$(".btn-grp").removeClass("change4");
						$(".input-group2").removeClass('change2');
						$(".cautionText2").removeClass('change3');
						$(".cautionText2").text("");
						$("#textTitle2").text("");	
						$(".playTotalVal").text("");
						$(".playHardVal").text("");
						$(".playlevel1Val").text("");
						$(".playlevel2Val").text("");
						$(".useEnkeVal").text("");
						//
												
						nowPageActive = false;
						nowPage = 1;
					},601);
				}
				
			});
			
			$(".flexContainer").each(function() {
				  $(this).addClass('active');
			});
			$(".input-group").addClass('active2');
			$(".btn-grp").addClass('active4');
			
			let cautionTextSet = () => {
				  if (cautionLength <= cautionText.length) {
				    let nowText = cautionText.slice(0, cautionLength);
				    $(".cautionText").text(nowText);
				    cautionLength++;
				    setTimeout(cautionTextSet, 50);
				  }else{
					  cautionLength = 1;
					  return;
				  }
			}
			cautionTextSet();
			
			
			$(".QBtn").on("click",function(){
				if($(this).hasClass("activeBtn")){
					
					$(".QnaModal").addClass("close");
					$(".QBtn").removeClass("activeBtn");
				}else{
						
						$(".QnaModal").removeClass("close");
						if(navigator.userAgent.toLowerCase().includes("mobile")){
							$(".QnaModal").removeClass("activeMobile3");
						}else{
							$(".QnaModal").removeClass("active3");
						}
						
						if(navigator.userAgent.toLowerCase().includes("mobile")){
							
							$(".QnaModal").addClass("activeMobile3");
						}else{
							
							$(".QnaModal").addClass("active3");	
						}
						
						$(this).addClass("activeBtn");
						
					
				}		
			});
			
			$(".modalCloseBtn").on("click",function(){
				
				$(".QnaModal").addClass("close");
				$(".QBtn").removeClass("activeBtn");
				
			});
			
			$(".modalPageUpBtn").on("click",function(){
				
				$(".QnaModal").animate({scrollTop: '0'}, 650);
				
			});
			
			$(".resizeBig").on("click",function(){
				if(nowZoom < 1.75){
					nowZoom += 0.25;
				$('body').css('zoom', '+=0.25');	
				}else{
					return;
				}
				
				
			});
			
			$(".resizeSmall").on("click",function(){
				if(nowZoom > 0.25){
					nowZoom -= 0.25;
					$('body').css('zoom', '-=0.25'); 
				}else{
					return;
				}
				
			});
			

			$(".sumCk").on("change",function(){
				if ($(".sumCk").is(':checked')) {
					let sum = parseInt($(".tryLevel2Num").val()) + parseInt($(".hardCk").val());
					if (sum < 0) {
						sum = 0;
					};
					$(".tryLevel2Num").val(sum);
				}else{
					let sum = parseInt($(".tryLevel2Num").val()) - parseInt($(".hardCk").val());
					$(".tryLevel2Num").val(sum);
				}
			});
			
			$("button[class^=bonusBtn]").on("click",function(){
				let val = $(this).data("val");
				$(".bonusCk").val(val);

				if($(this).hasClass("off")){
					if(val == "1"){
						$("#bonusNumber").text("1/3");
					}else if(val == "2"){
						$("#bonusNumber").text("2/3");
						$(".bonusBtn1").removeClass("off");
					}else if(val =="3"){
						$("#bonusNumber").text("3/3");
						$(".bonusBtn1").removeClass("off");
						$(".bonusBtn2").removeClass("off");
					}
					$(this).removeClass("off");
					return;
				}else{
					if(val == "0"){
						$("#bonusNumber").text("0/3");
						$(".bonusBtn1").addClass("off");
						$(".bonusBtn2").addClass("off");
						$(".bonusBtn3").addClass("off");
					}else if(val == "1"){
						$("#bonusNumber").text("1/3");
						$(".bonusBtn2").addClass("off");
						$(".bonusBtn3").addClass("off");
					}else if(val == "2"){
						$("#bonusNumber").text("2/3");
						$(".bonusBtn3").addClass("off");
					}
				}	
			});	

			$("button[class^=hardChanceBtn]").on("click",function(){
				
				let val = $(this).data("val");
				$(".hardCk").val(val);
				if(val == "1"){

						$("#bonusNumber2").text("1/1");
						$(this).removeClass("off2");
						
				}else{
						$("#bonusNumber2").text("0/1");
						$(".hardChanceBtn1").addClass("off2");	
				}
					
			});	
			
			
			$("button[class^=hardChanceBtn]").on("click", function() {
				
				if ($(".sumCk").is(':checked')) {
					let sum = 0;
					let nowValue = parseInt($(this).data("val"));
					if(parseInt($(".tryLevel2Num").val()) < nowValue ){
						sum = nowValue;
					}else{
						//if(firstHardCk > nowValue ){
						sum = parseInt($(".tryLevel2Num").val()) - (firstHardCk - nowValue);
						//}else{
						//	sum = parseInt($(".tryLevel2Num").val()) - firstHardCk + nowValue;
						//}
					}					

					if (sum < 0) {
						sum = 0;
					}
					
					$(".tryLevel2Num").val(sum);
				}
				firstHardCk = parseInt($(this).data("val"));
			});
			
			$(".resetButton").on("click",function(){
				if(calcActive){
					return;
				}
				
				$(".hardChanceBtn3").trigger("click");
				$(".bonusBtn3").trigger("click");
				if($(".sumCk").is(":checked")){
					$(".sumCk").trigger("click");
				};
				$(".tryLevel2Num").val(0);
				$(".tryLevel1Num").val(0);
				
				$("#resultBox").removeClass("resize");
				$("#textTitle").text("");
				$(".calcVal").text("");
				$(".enkeVal").text("");
				$(".madVal").text("");
			});
			
			$(".resultButton").on("click", 	function() {



				if(calcActive){
					return;
				}
				
				calcActive = true;

				let result = 0;
				let hardCk = $(".hardCk").val();
				let bonusCk = $(".bonusCk").val();
				let tryLevel2Num = $(".tryLevel2Num").val() != "" ? parseInt($(".tryLevel2Num").val()) : 0;
				if(tryLevel2Num < 0 ){
					return;
				}
				let tryLevel1Num = $(".tryLevel1Num").val() != "" ? parseInt($(".tryLevel1Num").val()) : 0;
				if(tryLevel1Num < 0 ){
					return;
				}
				let resultMad = 0;
				if(bonusCk > parseInt(hardCk) + parseInt(tryLevel1Num) + parseInt(tryLevel2Num)){
					resultMad = (parseInt(hardCk) +parseInt(tryLevel1Num) + parseInt(tryLevel2Num)) * madness;
				}else{
					resultMad = bonusCk * madness;	
				}
				
								
				if($(".seasonCk").is(":checked")){
					level1Result = {
						bonus : 20,
						normal : 7
					}
					
					tryLevel2Num = 0;
					hardCk = 0;
					
				}else{
					level1Result = {
						bonus : 15,
						normal : 10
					}
				}
				
				if(tryLevel2Num == 0 && tryLevel1Num == 0){
					if(hardCk == 0 ){
						return;	
					}
				}
				
				let sumCk = "N";
				if ($(".sumCk").is(':checked')) {
					sumCk = "Y";
				}
				
				
				let remainLevel2Num = 0;
				if(tryLevel2Num - hardCk > 0 ){
					remainLevel2Num = tryLevel2Num - hardCk;	
				}
				

				$("#resultBox").addClass("resize");

				let remainBonus = 0;
				let cost = 0;
								
				if (sumCk == "N") {
					cost = (hardCk * level2HardCost) + (tryLevel2Num * level2Cost) + (tryLevel1Num * level1Cost);
				} else {
					cost = (hardCk * level2HardCost) + ((tryLevel2Num - hardCk) * level2Cost) + (tryLevel1Num * level1Cost);
				}

				//레벨2 하드 이용횟수가 존재하는지 확인
				if (hardCk > 0) {
				//보너스 존재 여부 확인
				if (bonusCk > 0) {
					//** 23-07-17 수정 */
					//보너스보다 하드 이용횟수가 많은지 확인
//					if (hardCk > bonusCk) {
//							remainHardNum = hardCk - bonusCk; // 보너스 소진후 남은 하드 횟수
//							result += remainHardNum	* level2HardResult.normal; // 하드 일반 보상 계산 B

//							result += bonusCk * level2HardResult.bonus; // 하드 보너스 보상 계산 A
//							
//					} else {
//						remainBonus = bonusCk - hardCk; // 보너스가 하드 이용 횟수보다 많을 경우 남은 보너스 계산
//						result += hardCk * level2HardResult.bonus; // 하드 보너스 보상 계산 A
//
//					}

					result +=  hardCk * (level2HardResult.normal + (level2HardResult.bonus * bonusCk)); // 하드 보너스 보상 계산 A
						remainBonus = 0;
						//하드 횟수를 레벨2 거던 횟수에 포함시킬 경우
						if (sumCk == "Y") {
						//보너스 횟수가 레벨2 일반거던 횟수보다 많을 경우 C 없음
							if (remainBonus > remainLevel2Num) {

								result += remainLevel2Num * level2Result.bonus; // 레벨2 일반거던 보너스 보상 계산 D

								remainBonus = remainBonus - remainLevel2Num; // 레벨2 일반 거던 보너스 소모후 남은 보너스 계산

								if(remainBonus > tryLevel1Num ){
									result += tryLevel1Num * level1Result.bonus; //레벨1 일반 거던 보너스 보상 계산 E	
								}else{
									result += remainBonus * level1Result.bonus; //레벨1 일반 거던 보너스 보상 계산 E	
								}
								if( remainLevel1Num - remainBonus >= 0){
								result += (remainLevel1Num - remainBonus) * level2Result.normal; //레벨1 일반 거던 일반 보상 계산 E
							}
								

							} else {
							// 적을 경우
								result += remainBonus * level2Result.bonus; //레벨2 일반거던 보너스 보상 D

								if(remainLevel2Num - remainBonus >= 0){
									result += (remainLevel2Num - remainBonus) * level2Result.normal; //레벨2 일반거던 일반 보상 C
								}

								result += remainBonus * level1Result.bonus; //레벨1 일반거던 보너스 보상 F

								result += tryLevel1Num * level1Result.normal; //레벨1 일반거던 일반 보상 E

							}

						} else {
						//하드 횟수를 레벨2 거던 횟수에 포함시키지 않았을 경우

							//보너스 횟수가 레벨2 일반거던 횟수보다 많을 경우
							if (remainBonus > tryLevel2Num) {
								
								result += tryLevel2Num * level2Result.bonus; //레벨2 일반거던 보너스 보상 계산 D

								remainBonus = remainBonus - tryLevel2Num; //레벨2 일반 거던 보너스 소모후 남은 보너스 계산
								
								if(remainBonus > tryLevel1Num ){
									result += tryLevel1Num * level1Result.bonus; //레벨1 일반 거던 보너스 보상 계산 E	
								}else{
									result += remainBonus * level1Result.bonus; //레벨1 일반 거던 보너스 보상 계산 E	
								}
								

								if(tryLevel1Num - remainBonus >= 0){
									result += (tryLevel1Num - remainBonus) * level1Result.normal; //레벨1 일반 거던 일반 보상 계산 F

								}
								

							} else {

								result += remainBonus * level2Result.bonus; //레벨2 일반거던 보너스 보상 계산 D

								if(tryLevel2Num - remainBonus >= 0){
								result += (tryLevel2Num - remainBonus) * level2Result.normal; //레벨2 일반거던 일반 보상 C

								}
								result += tryLevel1Num * level1Result.normal; //레벨1 일반 거던 일반 보상 계산 F
							}

						}

						} else {
						//보너스가 없을 경우 B D F 제외됨
							result += hardCk * level2HardResult.normal; // 하드 일반 보상 계산 A

							//하드 횟수를 레벨2 거던 횟수에 포함시킬 경우
							if (sumCk === "Y") {
								if(remainLevel2Num - hardCk >= 0){
									result += (remainLevel2Num - hardCk) * level2Result.normal; //레벨2 일반거던 일반 보상 C	
								}
								result += tryLevel1Num * level1Result.normal; //레벨1 일반거던 일반 보상 E 
							} else {
							//아닐 경우

								result += tryLevel2Num * level2Result.normal; //레벨2 일반거던 일반 보상 C						
								result += tryLevel1Num * level1Result.normal; //레벨1 일반거던 일반 보상 E 

							}
						}

						} else {
						//하드 횟수가 없을 경우 A B 제외됨

						//보너스 횟수보다 레벨2 일반거던 횟수가 적을 경우 C 없음
						//3 > 0
						if (bonusCk > tryLevel2Num) {
						
							result += tryLevel2Num * level2Result.bonus;					//레벨2 일반거던 보너스 보상 D

							let sumNum = 0;
							
							if( bonusCk - tryLevel2Num > 0){
								sumNum	= bonusCk - tryLevel2Num;
							}

							if(sumNum > tryLevel1Num ){
									result += tryLevel1Num * level1Result.bonus; //레벨1 일반 거던 보너스 보상 계산 E	
								}else{
									result += sumNum * level1Result.bonus; //레벨1 일반 거던 보너스 보상 계산 E	
								}

							if((tryLevel1Num - sumNum) >= 0){
								result += (tryLevel1Num - sumNum) * level1Result.normal; 					//레벨1 일반거던 일반 보상 E

							}
							
							
						} else {
						// 적을 경우 F 없음
							
							result += bonusCk * level2Result.bonus; 					// 레벨2 일반거던 보너스 보상 계산 D

							if(tryLevel2Num - bonusCk >= 0){
								result += (tryLevel2Num - bonusCk) * level2Result.normal;	// 레벨2 일반거던 일반 보상 계산 C	
							}

							result += tryLevel1Num * level1Result.normal; 					//레벨1 일반 거던 일반 보상 계산 E

						}
					}
				
				$("#textTitle").text("");
				$(".calcVal").text("");
				$(".enkeVal").text("");
				$(".madVal").text("");
				text = makingText(result,cost,resultMad);

				});
		let timeoutBlock = 0;
		let delay = 30;
		let nowLength = 0;
		let battleText = "배틀패스 경험치";
		let enkeText = "소모 엔케팔린 모듈 : ";
		let imageSrc = "img/배패모양.png";
		let madText =" 획득 광기 : ";

		let makingText = (result, cost, resultMad) => {
		  let typingTextTitle = $("#textTitle");
		  typingTextTitle.text("결");
		  setTimeout(function () {
		    typingTextTitle.text("결과");
		    nowLength = 0;
		    timeoutBlock += delay;
		    battleTextSet(result, cost, resultMad);
		  }, delay);
		};
		let battleTextSet = (result, cost, resultMad) => {
			let nowText = "";
		  if (nowLength <= battleText.length) {
		    nowText = battleText.slice(0, nowLength);
		    $(".calcVal").html("<div>" + nowText + "</div>");
		    nowLength++;
		    timeoutBlock += delay;
		    setTimeout(battleTextSet, delay, result, cost, resultMad);
		  } else {

		    setTimeout(function () {
		      $(".calcVal").html(
		        "<div>배틀패스 경험치<img src='" + imageSrc + "' style='transform:translateY(-10%); height: 35px; margin-left:5px;'/></div>"
		      );
		      
		    }, delay);
		    
		    setTimeout(function () {
			      $(".calcVal").html(
			        "<div>배틀패스 경험치<img src='" + imageSrc + "' style='transform:translateY(-10%); height: 35px; margin-left:5px;'/> X " + result + "개 ( "+result/10+"레벨, 파편상자 : "+ ( Math.floor(result / 10) * 3) +"개 )</div>"
			      );
			      
			    logTextPageOne += "<div style='height:20px;'></div><div class='logText'>"+logTextCountPageOne+"번째 로그</div>"+
				"<div class='logText'>배틀패스 경험치 :  " + result + " ( "+result/10+"레벨, 파편상자 : "+ ( Math.floor(result / 10) * 3) +"개 )</div>";
				logTextCountPageOne++;
			      
			      setTimeout(typingAfterImage, delay, cost, resultMad);
			    }, delay);   
		  }
		};
		
		
		let typingAfterImage = (cost, resultMad) => {
			enkeText = "소모 엔케팔린 모듈 : " + cost+"개";
			let typingTextAfterImage = $(".enkeVal");
			typingTextAfterImage.text("");
			let i = 1;
			let typingInterval = setInterval(function () {
		    typingTextAfterImage.text(enkeText.slice(0,i));
		    i++;
		    timeoutBlock += delay;
		    if (i > enkeText.length) {
		      
		    	nowLength = 0;
		    	madTextSet(resultMad);
		    	
		    	clearInterval(typingInterval);
		      
		    }
		  }, delay);
		  
		  logTextPageOne += "<div class='logText'>"+enkeText+"</div>";

		};
		
		let madTextSet = (resultMad) => {
			  if (nowLength <= madText.length) {
				  madText =" 획득 광기 : " + resultMad + "개";
			    let nowText = madText.slice(0, nowLength);
			    $(".madVal").html("<div>" + nowText + "</div>");
			    nowLength++;
			    timeoutBlock += delay;
			    setTimeout(madTextSet, delay, resultMad);
			  } else{
				  	logTextPageOne += "<div class='logText'>"+madText+"</div>";
				  	$("#logTextBox").html(logTextPageOne);
	
					localStorage.setItem("logTextOneDataSave", logTextPageOne);
					localStorage.setItem("logTextOneCountSave", logTextCountPageOne);
					
//				  	let date = new Date();
//					date.setTime(date.getTime() + 168 * 60 * 60 * 1000); // 7일 동안 유효
//					document.cookie = "logTextOneDataSave="+encodeURIComponent(logTextPageOne)+"; expires=" + date.toUTCString();
//					document.cookie = "logTextOneCountSave="+logTextCountPageOne+"; expires=" + date.toUTCString();
				  	
					calcActive = false;
			  }
		};
});
	
// 제한 설정	
$(function(){
	
	$(document).on("keydown",function(){
		
		if(nowPage == 1 ){
			
			
		}
		
	});
	
	$("#one, #two").on("keyup",function(event){
		var regex = /^\d{1,4}$/;

		if (!regex.test($(this).val())) {
			$(this).val($(this).val().slice(0,4));
		}
		
		 if (event.key === "Enter") {
   			 event.preventDefault();
		
			$(".resultButton").trigger("click");
			
		   
		  }
				
	});
	
	$("#consumWeek").on("keyup",function(event){
		let regex = /^\d{1,2}$/;

		if (!regex.test($(this).val())) {
			$(this).val($(this).val().slice(0,2));
		}
		
		 if (event.key === "Enter") {
   			 event.preventDefault();
		
			$(".resultButton2").trigger("click");
		   
		  }
				
	});

	
	$("#needFrag, #nowFrag").on("keyup",function(event){
		let regex = /^\d{1,5}$/;
		
		if (!regex.test($(this).val())) {
			$(this).val($(this).val().slice(0,5));
		}
		
			 if (event.key === "Enter") {
   			 event.preventDefault();

			$(".resultButton2").trigger("click");
		   
		  }
	});

	$(".patchBtn").on("click",function(){
		window.open("about:blank").location.href = "https://www.evernote.com/shard/s727/sh/aca0e9ce-6c36-e919-7068-fce885128e04/pURhYExQdaRHccWMf8U9zUVQwfcuwfJwtJzk0p0bo-y_3eI_Vp_94N8b1w";
	});

	$(".logBtn").on("click",function(){
		
		if($("#logBox").hasClass("active5")){
			$(this).removeClass("activeBtn");
			$("#logBox").removeClass("active5");
			$("#logBox").addClass("close2");
		}else{
			$(this).addClass("activeBtn");
			$("#logBox").removeClass("close2");
			$("#logBox").addClass("active5");
		}

	});
	
	$(".logRemoveBtn").on("click",function(){
		
		logTextPageOne = "";
		logTextCountPageOne = 1;
		logTextPageTwo = "";
		logTextCountPageTwo = 1;	
		
		$("#logTextBox").html("");
		
		if(localStorage.getItem("logTextOneDataSave") != null){
			localStorage.removeItem("logTextOneDataSave");
			localStorage.removeItem("logTextOneCountSave");
			localStorage.removeItem("logTextTwoDataSave");
			localStorage.removeItem("logTextTwoCountSave");
		}
		
	});
		
});

		