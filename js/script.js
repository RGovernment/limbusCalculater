	if(navigator.userAgent.toLowerCase().includes("mobile")){
		$('body').css('zoom', '0.5'); 
	}
	
		let firstHardCk = 3;
		let madness = 250;
		let level2HardCost = 6;
		let level2Cost = 5;
		let level1Cost = 3;

		let level2HardResult = {
			bonus : 75,
			normal : 50
		};

		let level2Result = {
			bonus : 45,
			normal : 30
		}

		let level1Result = {
			bonus : 15,
			normal : 10
		}

		
		
		$(function() {
			
			let scrollEvent = () => {
			//영상 목록 스크롤시 스크롤 나타나게 설정
			$(".QnaModal").removeClass("hidden");
			clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(function(){
					//1.5초간의 지연시간동안 스크롤이 없을 경우 스크롤이 사라지게 설정
					$(".QnaModal").addClass("hidden");	
				},1500);
			};
			
			$(".QnaModal").on("scroll",scrollEvent);
			
			$(".flexContainer").each(function() {
				  $(this).addClass('active');
			});	
			$(".input-group").addClass('active2');
			
			let cautionLength = 1;
			let cautionText = "※보너스는 항상 가장 높은 난이도에서 사용한다고 가정합니다."; 
			let cautionTextSet = () => {
				  if (cautionLength <= cautionText.length) {
				    let nowText = cautionText.slice(0, cautionLength);
				    $(".cautionText").text(nowText);
				    cautionLength++;
				    setTimeout(cautionTextSet, 50);
				  }else{
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
						$(".QnaModal").removeClass("active3");
						$(this).addClass("activeBtn");
						$(".QnaModal").addClass("active3");	
					
				}
				

				
				
			});
			
			$(".resizeBig").on("click",function(){
				$('body').css('zoom', '+=0.5');
			});
			
			$(".resizeSmall").on("click",function(){
				$('body').css('zoom', '-=0.5'); 
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
				if($(this).hasClass("off2")){
					if(val == "1"){
						$("#bonusNumber2").text("1/3");
					}else if(val == "2"){
						$("#bonusNumber2").text("2/3");
						$(".hardChanceBtn1").removeClass("off2");
					}else if(val =="3"){
						$("#bonusNumber2").text("3/3");
						$(".hardChanceBtn1").removeClass("off2");
						$(".hardChanceBtn2").removeClass("off2");
					}
					$(this).removeClass("off2");
					return;
				}else{
					if(val == "0"){
						$("#bonusNumber2").text("0/3");
						$(".hardChanceBtn1").addClass("off2");
						$(".hardChanceBtn2").addClass("off2");
						$(".hardChanceBtn3").addClass("off2");
					}else if(val == "1"){
						$("#bonusNumber2").text("1/3");
						$(".hardChanceBtn2").addClass("off2");
						$(".hardChanceBtn3").addClass("off2");
					}else if(val == "2"){
						$("#bonusNumber2").text("2/3");
						$(".hardChanceBtn3").addClass("off2");
					}
				}	
			});	
			
			
			$("button[class^=hardChanceBtn]").on("click", function() {
				if ($(".sumCk").is(':checked')) {
					let sum = $(".tryLevel2Num").val() - firstHardCk;
					sum = parseInt(sum) + parseInt($(this).data("val"));
					if (sum < 0) {
						sum = 0;
					}
					firstHardCk = parseInt($(this).data("val"));
					$(".tryLevel2Num").val(sum);
				}
			});
			
			$(".resetButton").on("click",function(){
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

				
				let result = 0;
				let hardCk = $(".hardCk").val();
				let bonusCk = $(".bonusCk").val();
				let tryLevel2Num = $(".tryLevel2Num").val();
				let tryLevel1Num = $(".tryLevel1Num").val();
				let resultMad = bonusCk * madness;
				let sumCk = "N";
				if ($(".sumCk").is(':checked')) {
					sumCk = "Y";
				}
				
				if(tryLevel2Num == 0 && tryLevel1Num == 0){
					if(hardCk == 0 ){
						return;	
					}
					
				}
				
				let remainLevel2Num = tryLevel2Num - hardCk;

				$("#resultBox").addClass("resize");

				let remainBonus = 0;
				let cost = 0;
								
				if (sumCk == "N") {
					cost = (hardCk * level2HardCost) + (tryLevel2Num * level2Cost) + (tryLevel1Num * level1Cost);
				} else {
					cost = (hardCk * level2HardCost) + ((tryLevel2Num - hardCk) * level2Cost) + (tryLevel1Num * level1Cost);
				}
				console.log(cost);

				if (hardCk > 0) {
				//보너스 존재 여부 확인
				if (bonusCk > 0) {
					let remainHardNum = 0;
					//보너스보다 하드 이용횟수가 많은지 확인
					if (hardCk > bonusCk) {
						console.log("AA");
							remainHardNum = hardCk - bonusCk; // 보너스 소진후 남은 하드 횟수
							result += remainHardNum	* level2HardResult.normal; // 하드 일반 보상 계산 B
					//		console.log("B" + result);
							result += bonusCk * level2HardResult.bonus; // 하드 보너스 보상 계산 A
					//		console.log("A" + result);
							
					} else {
						remainBonus = bonusCk - hardCk; // 보너스가 하드 이용 횟수보다 많을 경우 남은 보너스 계산
						result += hardCk * level2HardResult.bonus; // 하드 보너스 보상 계산 A
						console.log("A" + result);
					}
						
						
							//하드 횟수를 레벨2 거던 횟수에 포함시킬 경우
						if (sumCk == "Y") {
						//보너스 횟수가 레벨2 일반거던 횟수보다 많을 경우 C 없음
							if (remainBonus > remainLevel2Num) {

								result += remainLevel2Num * level2Result.bonus; // 레벨2 일반거던 보너스 보상 계산 D
								console.log("D" + result);
								remainBonus = remainBonus - remainLevel2Num; // 레벨2 일반 거던 보너스 소모후 남은 보너스 계산

								if(remainBonus > tryLevel1Num ){
									result += tryLevel1Num * level1Result.bonus; //레벨1 일반 거던 보너스 보상 계산 E	
								}else{
									result += remainBonus * level1Result.bonus; //레벨1 일반 거던 보너스 보상 계산 E	
								}
								if( remainLevel1Num - remainBonus >= 0){
								result += (remainLevel1Num - remainBonus) * level2Result.normal; //레벨1 일반 거던 일반 보상 계산 E
								console.log("E" + result);
							}
								

							} else {
							// 적을 경우
								result += remainBonus * level2Result.bonus; //레벨2 일반거던 보너스 보상 D
								console.log("D" + result); 
								if(remainLevel2Num - remainBonus >= 0){
									result += (remainLevel2Num - remainBonus) * level2Result.normal; //레벨2 일반거던 일반 보상 C
								}
								
								console.log("C" + result);

								result += remainBonus * level1Result.bonus; //레벨1 일반거던 보너스 보상 F
								console.log("F" + result);
								result += tryLevel1Num * level1Result.normal; //레벨1 일반거던 일반 보상 E
								console.log("E" + result);

							}

						} else {
						//하드 횟수를 레벨2 거던 횟수에 포함시키지 않았을 경우

							//보너스 횟수가 레벨2 일반거던 횟수보다 많을 경우
							if (remainBonus > tryLevel2Num) {
								
								result += tryLevel2Num * level2Result.bonus; //레벨2 일반거던 보너스 보상 계산 D
								console.log("D" + result);
								remainBonus = remainBonus - tryLevel2Num; //레벨2 일반 거던 보너스 소모후 남은 보너스 계산
								
								if(remainBonus > tryLevel1Num ){
									result += tryLevel1Num * level1Result.bonus; //레벨1 일반 거던 보너스 보상 계산 E	
								}else{
									result += remainBonus * level1Result.bonus; //레벨1 일반 거던 보너스 보상 계산 E	
								}
								
								console.log("E" + result);
								if(tryLevel1Num - remainBonus >= 0){
									result += (tryLevel1Num - remainBonus) * level1Result.normal; //레벨1 일반 거던 일반 보상 계산 F
									console.log("F" + result);
								}
								

							} else {

								result += remainBonus * level2Result.bonus; //레벨2 일반거던 보너스 보상 계산 D
								console.log("D" + result);
								if(tryLevel2Num - remainBonus >= 0){
								result += (tryLevel2Num - remainBonus) * level2Result.normal; //레벨2 일반거던 일반 보상 C
								console.log("C" + result);
								}
								result += tryLevel1Num * level1Result.normal; //레벨1 일반 거던 일반 보상 계산 F
								console.log("F" + result);

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
							console.log("D : " + result);
							
							let sumNum = 0;
							
							if( bonusCk - tryLevel2Num > 0){
								sumNum	= bonusCk - tryLevel2Num;
							}

							result += sumNum * level1Result.bonus; 							//레벨1 일반 거던 보너스 보상 계산 F
							console.log("F : " + result);
							
							result += (tryLevel1Num - sumNum) * level1Result.normal; 					//레벨1 일반거던 일반 보상 E
							console.log("E : " + result);
							
						} else {
						// 적을 경우 F 없음
							
							result += bonusCk * level2Result.bonus; 					// 레벨2 일반거던 보너스 보상 계산 D
							console.log("D : " + result);
							if(tryLevel2Num - bonusCk >= 0){
								result += (tryLevel2Num - bonusCk) * level2Result.normal;	// 레벨2 일반거던 일반 보상 계산 C	
							}
							console.log("C : " + result);
							result += tryLevel1Num * level1Result.normal; 					//레벨1 일반 거던 일반 보상 계산 E
							console.log("E : " + result);
						}
					}
				$("#textTitle").text("");
				$(".calcVal").text("");
				$(".enkeVal").text("");
				$(".madVal").text("");
				text = makingText(result,cost,resultMad);

				});
				
				let titleText = "";
		let delay = 50;
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
		    battleTextSet(result, cost, resultMad);
		  }, delay);
		};

		let battleTextSet = (result, cost, resultMad) => {
		  if (nowLength <= battleText.length) {
		    let nowText = battleText.slice(0, nowLength);
		    $(".calcVal").html("<div>" + nowText + "</div>");
		    nowLength++;
		    setTimeout(battleTextSet, 70, result, cost, resultMad);
		  } else {
		    setTimeout(function () {
		      $(".calcVal").html(
		        "<div>배틀패스 경험치<img src='" + imageSrc + "' style='transform:translateY(-10%); height: 35px; margin-left:5px;'/></div>"
		      );
		      
		    }, delay);
		    
		    setTimeout(function () {
			      $(".calcVal").html(
			        "<div>배틀패스 경험치<img src='" + imageSrc + "' style='transform:translateY(-10%); height: 35px; margin-left:5px;'/> X " + result + "개 ( "+result/10+"레벨 )</div>"
			      );
			      setTimeout(typingAfterImage, 100, cost, resultMad);
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
		    if (i > enkeText.length) {
		      
		    	nowLength = 0;
		    	madTextSet(resultMad);
		    	
		    	clearInterval(typingInterval);
		      
		    }
		  }, delay);

		};
		
		let madTextSet = (resultMad) => {
			  if (nowLength <= madText.length) {
				  madText =" 획득 광기 : " + resultMad + "개";
			    let nowText = madText.slice(0, nowLength);
			    $(".madVal").html("<div>" + nowText + "</div>");
			    nowLength++;
			    setTimeout(madTextSet, delay, resultMad);
			  } 
			};
		

		});
		
$(function(){
	

});
		
		
