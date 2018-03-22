/*
* @Author: Eric
* @Date: 2018-02-13
*/

'use strict';

let mainModule = angular.module('mainModule', ['modal/confirm-modal.html']);

mainModule.controller('warningModalCtrl', ['$scope', '$uibModalInstance', '$translate',
($scope, $uibModalInstance, $translate) => {

	$scope.closeModal = option => $uibModalInstance.close(option);

	$scope.modalBodyText = $translate.instant('WARNING');
	$scope.submitText = $translate.instant('OK');
}]);

mainModule.controller('menuCtrl', ['$scope', '$state', '$translate', '$window', '$anchorScroll', 'localStorageService',
($scope, $state, $translate, $window, $anchorScroll, localStorageService) => {

	$scope.brandInfo = {
		name: $translate.instant('BRAND_NAME'),
	};

	$scope.menuList = [{
		title: $translate.instant('ALPHA_CAR_CHAIN'),
		href: 'club',
	}, {
		title: $translate.instant('TOKEN'),
		href: 'token',
	}, {
		title: $translate.instant('ROADMAP'),
		href: 'roadmap',
	}, {
		title: $translate.instant('TEAM'),
		href: 'team',
	}, {
		title: $translate.instant('WHITE_PAPER'),
		url: $translate.instant('WHITE_PAPER_PDF'),
		highlight: true,
	}, {
		title: $translate.instant('FAQ'),
		href: 'FAQ',
	}, {
		title: $translate.instant('CONTACT_US'),
		href: 'contact-us',
	}];

	$scope.control = [{
		title: $translate.instant('LOGIN'),
		url: ''
	}, {
		title: $translate.instant('REGISTER'),
		url: ''
	}];

	$scope.scrollTo = (href, url) => {
		if(href){
			$anchorScroll(href);
		}else if(url){
			window.open(url);
		}
		$scope.menu = 0;
	};

	$scope.changeState = (option) => {
		if(!option || (!option.sref && !option.href)){
			return;
		}
		$state.go(state, {}, {
			reload: true,
		});
	};

	$scope.hoverIndex = -1;
	$scope.changeHoverIndex = (index) => {
		$scope.hoverIndex = index;
	};

	$scope.languageInfo = {
		title: $translate.instant('LANGUAGE'),
		list: [{
			title: $translate.instant('CHINESE'),
			value: 'cn',
			image: require('../img/language/icon_China21x15.png'),
		}, {
			title: $translate.instant('ENGLISH'),
			value: 'en',
			image: require('../img/language/icon_UnitedStates21x15.png'),
		}]
	};

	$scope.currentLanguageInfo = $translate.use() == 'cn' ? $scope.languageInfo.list[0] : $scope.languageInfo.list[1];

	$scope.changeLanguage = (lang) => {
		localStorageService.remove('tipTime');
		window.localStorage.lang = lang;
		$translate.use(lang);
		$window.location.reload();
	};

}]);

mainModule.controller('footerCtrl', ['$scope', '$state', '$translate', '$sce', '$window', 
($scope, $state, $translate, $sce, $window) => {

	$scope.copyright = $translate.instant('COPYRIGHT');

}]);

mainModule.controller('pageCtrl', ['$scope', '$translate', '$sce', 'utilsService', 'mainService', 'localStorageService',
($scope, $translate, $sce, utilsService, mainService, localStorageService) => {

	mainService.checkIP({}, (err, res) => {
		if(!err){
			if(res.show_not_allow == true){
				if(localStorageService.get('tipTime')){
					var tipTime = localStorageService.get('tipTime');
					console.log(tipTime);
					if((new Date().getTime() - tipTime) > 2*60*60*1000){
						localStorageService.remove('tipTime');
						localStorageService.set('tipTime', new Date().getTime());
							utilsService.openModal({
						    templateUrl: 'modal/confirm-modal.html',
						    controller: 'warningModalCtrl',
						    size: 'md',
						});
					}
				}else{
					localStorageService.set('tipTime', new Date().getTime());
						utilsService.openModal({
					    templateUrl: 'modal/confirm-modal.html',
					    controller: 'warningModalCtrl',
					    size: 'md',
					});
				}
			}
		}else {
			console.log(err);
		}
	});

	$scope.mainHeaderInfo = {
		// image: utilsService.getImageUrl($translate.instant('HOME_HEADER_IMG')),
		title: $translate.instant('MAIN_HEADER_TITLE'),
		subTitle: $translate.instant('MAIN_HEADER_SUB_TITLE'),
	};

	$scope.minorHeaderInfo = {
		brandName: $translate.instant('BRAND_NAME'),
		// title: $translate.instant('MINOR_HEADER_TITLE'),
		subTitle: $translate.instant('MINOR_HEADER_TITLE'),
		text: $sce.trustAsHtml($translate.instant('MINOR_HEADER_TEXT')),
		whitePaper: $translate.instant('VIEW_WHITE_PAPER'),
		whitePaperUrl: $translate.instant('WHITE_PAPER_PDF'),
	};

	$scope.scrollTo = ( url) => {
		window.open(url);
	};

	$scope.moduleInfo = {
		list: [{
			title: $sce.trustAsHtml($translate.instant('MODULE_1_TITLE')),
			text: $translate.instant('MODULE_1_TEXT'),
			icon: require('../img/module/icon_chain.png'),
		}, {
			title: $sce.trustAsHtml($translate.instant('MODULE_2_TITLE')),
			text: $translate.instant('MODULE_2_TEXT'),
			icon: require('../img/module/icon_bigdata.png'),
		}, {
			title: $sce.trustAsHtml($translate.instant('MODULE_3_TITLE')),
			text: $translate.instant('MODULE_3_TEXT'),
			icon: require('../img/module/icon_network.png'),
		}],
	};

	$scope.introduceInfo = {
		title: $translate.instant('INTRODUCE_TITLE'),
		list: [{
			title: $translate.instant('INTRODUCE_CHAIN_1_TITLE'),
			text: $translate.instant('INTRODUCE_CHAIN_1_TEXT'),
		}, {
			title: $translate.instant('INTRODUCE_CHAIN_2_TITLE'),
			text: $translate.instant('INTRODUCE_CHAIN_2_TEXT'),
		}],
		download: $translate.instant('DOWNLOAD'),
	};

	$scope.clubInfo = {
		// title: $translate.instant('BRAND_NAME'),
		subTitle: $translate.instant('CLUB_SUB_TITLE'),
		list: [{
			title: $translate.instant('CLUB_1_TITLE'),
			text: $sce.trustAsHtml($translate.instant('CLUB_1_TEXT')),
			icon: require('../img/club/icon_design.png'),
		}, {
			title: $translate.instant('CLUB_2_TITLE'),
			text: $sce.trustAsHtml($translate.instant('CLUB_2_TEXT')),
			icon: require('../img/club/icon_R&D.png'),
		}, {
			title: $translate.instant('CLUB_3_TITLE'),
			text: $sce.trustAsHtml($translate.instant('CLUB_3_TEXT')),
			icon: require('../img/club/icon_share.png'),
		}, {
			title: $translate.instant('CLUB_4_TITLE'),
			text: $sce.trustAsHtml($translate.instant('CLUB_4_TEXT')),
			icon: require('../img/club/icon_ubi.png'),
		}, {
			title: $translate.instant('CLUB_5_TITLE'),
			text: $sce.trustAsHtml($translate.instant('CLUB_5_TEXT')),
			icon: require('../img/club/icon_repair.png'),
		}, {
			title: $translate.instant('CLUB_6_TITLE'),
			text: $sce.trustAsHtml($translate.instant('CLUB_6_TEXT')),
			icon: require('../img/club/icon_carloan.png'),
		}, {
			title: $translate.instant('CLUB_7_TITLE'),
			text: $sce.trustAsHtml($translate.instant('CLUB_7_TEXT')),
			icon: require('../img/club/icon_usedcar.png'),
		},],
	};

	$scope.tokenInfo = {
		title: $translate.instant('TOKEN_TITLE'),
		subTitle: $translate.instant('TOKEN_SUB_TITLE'),
	};

	$scope.tokenPieChartOption = mainService.getTokenPieChartOption({
		list: [{
			name: $translate.instant('TOKEN_CHART_TEXT_1'),
			value: 0.25,
			label: {
				padding: [0, 0, 30, 50],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_2'),
			value: 0.16,
			label: {
				padding: [0, 0, 0, 50],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_3'),
			value: 0.06,
			label: {
				padding: [100, 0, 0, 55],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_4'),
			value: 0.03,
			label: {
				padding: [150, 0, 0, 20],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_5'),
			value: 0.2,
			label: {
				padding: [30, 0, 0, 0],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_6'),
			value: 0.1,
			label: {
				padding: [0, 80, 0, 0],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_7'),
			value: 0.2,
			label: {
				padding: [0, 30, 30, 0],
			}
		}],
		fontSize: {
			normal: {
				name: 12,
				value: 20,
				height: 30,
			},
			emphasis: {
				name: 14,
				value: 24,
				height: 32,
			}
		}
	});

	$scope.tokenPieChartOptionMobile = mainService.getTokenPieChartOption({
		list: [{
			name: $translate.instant('TOKEN_CHART_TEXT_MOBILE_1'),
			value: 0.25,
			label: {
				padding: [0, 0, 30, 35],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_MOBILE_2'),
			value: 0.16,
			label: {
				padding: [20, 0, 0, 40],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_MOBILE_3'),
			value: 0.06,
			label: {
				padding: [50, 0, 0, 35],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_MOBILE_4'),
			value: 0.03,
			label: {
				padding: [80, 0, 0, 15],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_MOBILE_5'),
			value: 0.2,
			label: {
				padding: [30, 20, 0, 0],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_MOBILE_6'),
			value: 0.1,
			label: {
				padding: [20, 35, 20, 0],
			}
		}, {
			name: $translate.instant('TOKEN_CHART_TEXT_MOBILE_7'),
			value: 0.2,
			label: {
				padding: [20, 10, 30, 0],
			}
		}],
		fontSize: {
			normal: {
				name: 10,
				value: 12,
				height: 12,
			},
			emphasis: {
				name: 11,
				value: 13,
				height: 13,
			}
		}
	});

	$scope.roadmapInfo = {
		title: $translate.instant('ROADMAP'),
		list: [{
			title: $translate.instant('ROADMAP_1_TITLE'),
			text: $translate.instant('ROADMAP_1_TEXT'),
		}, {
			title: $translate.instant('ROADMAP_2_TITLE'),
			text: $translate.instant('ROADMAP_2_TEXT'),
		}, {
			title: $translate.instant('ROADMAP_3_TITLE'),
			text: $translate.instant('ROADMAP_3_TEXT'),
		}, {
			title: $translate.instant('ROADMAP_4_TITLE'),
			text: $translate.instant('ROADMAP_4_TEXT'),
		}, {
			title: $translate.instant('ROADMAP_5_TITLE'),
			text: $translate.instant('ROADMAP_5_TEXT'),
		}, {
			title: $translate.instant('ROADMAP_6_TITLE'),
			text: $translate.instant('ROADMAP_6_TEXT'),
		}, {
			title: $translate.instant('ROADMAP_7_TITLE'),
			text: $translate.instant('ROADMAP_7_TEXT'),
		}, {
			title: $translate.instant('ROADMAP_8_TITLE'),
			text: $translate.instant('ROADMAP_8_TEXT'),
		}, {
			title: $translate.instant('ROADMAP_9_TITLE'),
			text: $translate.instant('ROADMAP_9_TEXT'),
		}],
	};

	$scope.teamInfo = {
		founderTitle: $translate.instant('TEAM_PROJECT'),
		consultantTitle: $translate.instant('TEAM_CONSULTANT'),
		founderList: [{
			image: require('../img/team/img_denggang.png'),
			name: $translate.instant('TEAM_1_NAME'),
			identity: $translate.instant('TEAM_1_IDENTITY'),
			intro: $translate.instant('TEAM_1_INTRO'),
			presentation: $translate.instant('TEAM_1_PRESENTATION'),
			class: 'team-border',
		}, {
			image: require('../img/team/img_zhanglei.png'),
			name: $translate.instant('TEAM_2_NAME'),
			identity: $translate.instant('TEAM_2_IDENTITY'),
			intro: $translate.instant('TEAM_2_INTRO'),
			presentation: $translate.instant('TEAM_2_PRESENTATION'),
			class: 'team-border',
		}, {
			image: require('../img/team/img_xuyifei.png'),
			name: $translate.instant('TEAM_3_NAME'),
			identity: $translate.instant('TEAM_3_IDENTITY'),
			intro: $translate.instant('TEAM_3_INTRO'),
			presentation: $translate.instant('TEAM_3_PRESENTATION'),
		}, {
			image: require('../img/team/img_lujie.png'),
			name: $translate.instant('TEAM_4_NAME'),
			identity: $translate.instant('TEAM_4_IDENTITY'),
			intro: $translate.instant('TEAM_4_INTRO'),
			presentation: $translate.instant('TEAM_4_PRESENTATION'),
		}],
		consultantList: [{
			image: require('../img/team/img_qiyinyong.png'),
			name: $translate.instant('TEAM_5_NAME'),
			identity: $translate.instant('TEAM_5_IDENTITY'),
			presentation: $translate.instant('TEAM_5_PRESENTATION'),
			class: 'team-border',
		}, {
			image: require('../img/team/img_luojiebo.png'),
			name: $translate.instant('TEAM_6_NAME'),
			identity: $translate.instant('TEAM_6_IDENTITY'),
			presentation: $translate.instant('TEAM_6_PRESENTATION'),
			class: 'team-border',
		}, {
			image: require('../img/team/img_zhangshengli.png'),
			name: $translate.instant('TEAM_7_NAME'),
			identity: $translate.instant('TEAM_7_IDENTITY'),
			presentation: $translate.instant('TEAM_7_PRESENTATION'),
		}, {
			image: require('../img/team/img_caohuining.png'),
			name: $translate.instant('TEAM_8_NAME'),
			identity: $translate.instant('TEAM_8_IDENTITY'),
			presentation: $translate.instant('TEAM_8_PRESENTATION'),
			class: 'team-border',
		}, {
			image: require('../img/team/img_taojianhui.png'),
			name: $translate.instant('TEAM_8_1_NAME'),
			identity: $translate.instant('TEAM_8_1_IDENTITY'),
			presentation: $translate.instant('TEAM_8_1_PRESENTATION'),
			class: 'team-border',
		}, {
			image: require('../img/team/img_xingpu.png'),
			name: $translate.instant('TEAM_11_NAME'),
			identity: $translate.instant('TEAM_11_IDENTITY'),
			presentation: $translate.instant('TEAM_11_PRESENTATION'),
		}, {
			image: require('../img/team/img_wangyuehua.png'),
			name: $translate.instant('TEAM_9_NAME'),
			identity: $translate.instant('TEAM_9_IDENTITY'),
			presentation: $translate.instant('TEAM_9_PRESENTATION'),
			class: 'team-border',
		}, {
			image: require('../img/team/img_wanglijie.png'),
			name: $translate.instant('TEAM_10_NAME'),
			identity: $translate.instant('TEAM_10_IDENTITY'),
			presentation: $translate.instant('TEAM_10_PRESENTATION'),
		}],
	};

	$scope.showPresentationOne = false;
	$scope.showPresentationTwo = false;
	$scope.toShowPresentation = (item, $index) =>{
		if($index < 3){
			$scope.showPresentationOne = true;
			$scope.showPresentationTwo = false;
		}else if($index > 2){
			$scope.showPresentationTwo = true;
			$scope.showPresentationOne = false;
		}
		$scope.presentation = item.presentation;
	}

	$scope.showCounselorPresentationOne = false;
	$scope.showCounselorPresentationTwo = false;
	$scope.showCounselorPresentationThree = false;
	$scope.toShowShowCounselorPresentation = (item, $index) =>{
		if($index < 3){
			$scope.showCounselorPresentationOne = true;
			$scope.showCounselorPresentationTwo = false;
			$scope.showCounselorPresentationThree = false;
		}else if($index > 2 && $index < 6){
			$scope.showCounselorPresentationOne = false;
			$scope.showCounselorPresentationTwo = true;
			$scope.showCounselorPresentationThree = false;
        }else if($index > 5){
        	$scope.showCounselorPresentationOne = false;
			$scope.showCounselorPresentationTwo = false;
			$scope.showCounselorPresentationThree = true;
        }
		$scope.counselorPresentation = item.presentation;
	}

	$scope.resourceInfo = {
		title: $translate.instant('RESOURCE'),
		list: [{
			image: require('../img/img_anshengtianping.png'),
		}],
	};

	$scope.faqInfo = {
		title: $translate.instant('FAQ'),
		list: [{
			title: $translate.instant('FAQ_1_TITLE'),
			children: [{
				ask: $translate.instant('FAQ_1_1_Q'),
				answer: $translate.instant('FAQ_1_1_A'),
				showAnswer: false,
				image: require('../img/icon_add.png'),
			}, {
				ask: $translate.instant('FAQ_1_2_Q'),
				answer: $translate.instant('FAQ_1_2_A'),
				showAnswer: false,
				image: require('../img/icon_add.png'),
			}, {
				ask: $translate.instant('FAQ_1_3_Q'),
				answer: $translate.instant('FAQ_1_3_A'),
				showAnswer: false,
				image: require('../img/icon_add.png'),
			}, {
				ask: $translate.instant('FAQ_1_4_Q'),
				answer: $translate.instant('FAQ_1_4_A'),
				showAnswer: false,
				image: require('../img/icon_add.png'),
			}, {
				ask: $translate.instant('FAQ_1_5_Q'),
				answer: $translate.instant('FAQ_1_5_A'),
				showAnswer: false,
				image: require('../img/icon_add.png'),
			}, {
				ask: $translate.instant('FAQ_1_6_Q'),
				answer: $translate.instant('FAQ_1_6_A'),
				showAnswer: false,
				image: require('../img/icon_add.png'),
			}, {
				ask: $translate.instant('FAQ_1_7_Q'),
				answer: $translate.instant('FAQ_1_7_A'),
				showAnswer: false,
				image: require('../img/icon_add.png'),
			}],
		}],
	};

	$scope.changeColor = 0;
	$scope.queryContentList = $scope.faqInfo.list[0].children;
	$scope.onChangeQueryContent = (item, $index) => {
		$scope.queryContentList = item.children;
		$scope.changeColor = $index;
	}

	$scope.onShowAnswerClick = (item) => {
		item.showAnswer = !item.showAnswer;
		if(item.image == require('../img/icon_add.png')){
			item.image = require('../img/icon_sub.png');
		}else if(item.image == require('../img/icon_sub.png')){
			item.image = require('../img/icon_add.png');
		}
	};

	$scope.contactInfo = {
		title: $translate.instant('CONTACT_US'),
		emailList: [{
			title: $translate.instant('BUSINESS_EMAIL'),
			content: 'business@alphaauto.io',
		}, {
			title: $translate.instant('RESUME_EMAIL'),
			content: 'hr@alphaauto.io',
		}],
		socialList: [{
			image: require('../img/social/icon_facebook.png'),
			url: 'https://www.facebook.com/alphacar.io/',
		}, {
			image: require('../img/social/icon_twitter.png'),
			url: 'https://twitter.com/AlphaCar_',
		}, {
			image: require('../img/social/icon_telegram.png'),
			url: 'https://t.me/AlphaAutoAssociation',
		}, {
			image: require('../img/social/icon_github.png'),
			url: 'https://github.com/AlphaAutoIO',
		}, {
			image: require('../img/social/icon_medium.png'),
			url: 'https://medium.com/@AlphaCar',
		}, {
			image: require('../img/social/icon_reddit.png'),
			url: 'https://www.reddit.com/user/AlphaCar_',
		}],
	};

}]);

module.exports = mainModule;