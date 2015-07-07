!function(){function e(e,t){e.state("app",{"abstract":!0,views:{"header@":{templateUrl:"app/shared/header.html"},"footer@":{templateUrl:"app/shared/footer.html"}}}),t.otherwise("/")}var t=angular.module("app",["ui.router","ui.bootstrap","strformat","jsend","app.search","app.email","app.help"]);e.$inject=["$stateProvider","$urlRouterProvider"],t.config(e)}(),function(){function e(e){e.state("app.email",{"abstract":!0,url:"/email"}).state("app.email.unsubscribe",{url:"/unsubscribe/:uuid",views:{"content@":{templateUrl:"app/email/unsubscribe.html"}}})}var t=angular.module("app.email",[]);e.$inject=["$stateProvider"],t.config(e)}(),function(){function e(e){e.state("app.help",{url:"/help",views:{"content@":{templateUrl:"app/help/user-guide.html"}}})}var t=angular.module("app.help",[]);e.$inject=["$stateProvider"],t.config(e)}(),function(){function e(e){e.state("app.search",{url:"/?type&brand&date&sex&age&skip&limit",views:{"content@":{templateUrl:"app/search/search.html"}}})}var t=angular.module("app.search",[]);e.$inject=["$stateProvider"],t.config(e)}(),function(e){function t(e,t,a,n){function r(e){if(e&&e.brand){var t=!1;angular.forEach(c,function(a){a.active=!1,a.term==e.brand&&(a.active=!0,l=a,t=!0)}),u.interval=t?-1:o}}function i(a){l&&(l.active=!1),l=a,l.active=!0;var n=angular.copy(t);n.brand=a.term,n.skip=0,e.go("app.search",n,{reload:!0})}function s(e,a,s){u=e,e.interval=o=1e3*e.seconds,null===c?n.images().then(function(a){c=a,c.length>0&&(c[0].active=!0),r(t),e.images=c}):(e.images=c,r(t)),e.selectImage=i}a.enabled(!0);var o,u,c=null,l=null;return{restrict:"E",scope:{seconds:"="},link:s,templateUrl:"app/carousel/be-safe-carousel.html"}}t.$inject=["$state","$stateParams","$animate","besafe"],e.directive("beSafeCarousel",t)}(angular.module("app.search")),function(e){function t(e,t){var a=this;a.uuid=e.uuid,a.success="",a.error="",t.unsubscribe(a.uuid).then(function(e){a.success=e},function(e){a.error=e})}t.$inject=["$stateParams","besafe"],e.controller("UnsubscribeCtrl",t)}(angular.module("app.email")),function(e){function t(e){var t=new Date(e);return t.toLocaleDateString()}function a(e){var t=[];"number"==typeof e.age?(t.push(11===e.age||8===e.age||18===e.age||e.age>79&&e.age<90?"An":"A"),t.push(e.age),t.push("year-old")):t.push("A");var a="number"==typeof e.age&&e.age<18;return t.push("male"===e.sex?a?"boy":"man":"female"===e.sex?a?"girl":"woman":a?"child":"person"),t.push("experienced"),t.push(n(e.issues)+"."),e.drugs.length>0&&(t.push("This person was taking all of the following:"),t.push(n(e.drugs)+".")),t.join(" ")}function n(e){for(var t=[],a=0,n=e.length;n>a;a++)a>0&&t.push(2===n?" and ":a===n-1?", and ":", "),t.push(e[a]);return t.join("")}e.filter("timestamp",function(){return t}),e.filter("event",function(){return a})}(angular.module("app.search")),function(e){function t(e,t,a){var n=this;n.query=e.query,n.results=e.report,n.email=null,n.complaint=null,n.report=function(){var e={email:n.email,complaint:n.complaint,query:n.query,report:n.results};a({method:"post",url:"/api/reports",data:e}).then(function(e){t.close(),alert("Your adverse reaction has been reported.")},function(e){var a;a=0===e.status?"The Internet connection appears to be offline.":e.statusText,t.close(),alert("There was an error in submitting your report.\n\n"+a)})},n.clear=function(){n.checked===!1&&(n.email=null)},n.cancel=function(){t.dismiss()}}t.$inject=["$scope","$modalInstance","$http"],e.controller("ReportCtrl",t)}(angular.module("app.search")),function(e){function t(e){function t(t,a){var n=parseInt(e[t]);return isNaN(n)?a:n}function a(t,a){var n=e[t];return n=n||a||"",n.trim().toLowerCase()}function n(t,a){var n=e[t],r=i[t][n];return r?n:a}function r(){return{brand:a("brand"),type:n("type","recalls"),age:n("age","any"),date:n("date","any"),sex:n("sex","any"),skip:t("skip",0),limit:t("limit",10)}}var i={date:{any:{days:null,text:"All date ranges"},past30d:{days:30,text:"Past 30 days"},past60d:{days:60,text:"Past 60 days"},past90d:{days:90,text:"Past 90 days"},past12m:{days:365,text:"Past twelve months"},past5y:{days:1825,text:"Past five years"}},type:{recalls:"recalls",events:"events"},sex:{any:{value:null,text:"Both"},male:{value:"m",text:"Male"},female:{value:"f",text:"Female"}},age:{any:{min:0,max:200,text:"All age groups"},infant:{min:0,max:4,text:"Children 0 to 4"},child:{min:5,max:12,text:"Children 5 to 12"},teen:{min:13,max:17,text:"Teens 13 to 17"},young:{min:18,max:25,text:"Adults 18 to 25"},adult:{min:26,max:39,text:"Adults 26 to 39"},mid:{min:40,max:55,text:"Adults 40 to 55"},older:{min:56,max:69,text:"Adults 56 to 69"},elderly:{min:70,max:200,text:"Adults 70+"}}};return{options:i,criteria:r}}t.$inject=["$stateParams"],e.factory("searchParams",t)}(angular.module("app.search")),function(e){function t(e,t,a,n,r){function i(e){var t={search_type:e.type,brand_name:e.brand,skip:e.skip,limit:e.limit};return o.options.date[e.date].days&&(t.offset_days=o.options.date[e.date].days),o.options.sex[e.sex].value&&(t.sex=o.options.sex[e.sex].value),t.min_age=o.options.age[e.age].min,t.max_age=o.options.age[e.age].max,t}function s(e){if(e.brand){var t=i(e);o.waiting=!0,r.search(t).then(function(t){u=t.total,o.request=angular.copy(e),o.results=t.results},function(e){u=0,o.request=null,o.results=null,o.message=e})["finally"](function(){o.waiting=!1})}}var o=this,u=0;o.request=null,o.results=null,o.message=null,o.waiting=!1,o.options=n.options,o.criteria=n.criteria(),o.first=function(){return o.criteria.skip+1},o.last=function(){return Math.min(o.criteria.skip+o.criteria.limit,u)},o.total=function(){return u},o.atBeginning=function(){return 0===o.criteria.skip},o.atEnd=function(){return o.last()>=u},o.prev=function(){o.criteria.skip-=o.criteria.limit,a.go("app.search",o.criteria,{notify:!1}),s(o.criteria)},o.next=function(){o.criteria.skip+=o.criteria.limit,a.go("app.search",o.criteria,{notify:!1}),s(o.criteria)},o.search=function(e){o.criteria.skip=0,e?a.go("app.search",o.criteria):(a.go("app.search",o.criteria,{notify:!1}),s(o.criteria))},o.subscribe=function(){e.query=i(o.criteria),t.open({templateUrl:"app/search/subscribe.html",controller:"SubscriptionCtrl as vm",scope:e})},o.report=function(a){e.report=a,e.query=i(o.criteria),t.open({templateUrl:"app/search/report.html",controller:"ReportCtrl as vm",scope:e})},o.criteria.brand?(s(o.criteria),o.shareLinks={twitter:"https://twitter.com/share?source=tweetbutton&url="+encodeURIComponent(window.location.href),facebook:"https://www.facebook.com/sharer/sharer.php?u="+window.location.origin}):(o.message=null,o.request=null,o.results=null),o.searchTerms=[],r.names().then(function(e){o.searchTerms=e}),o.typeaheadContains=function(e,t){return e.indexOf(t.toLowerCase())>=0},o.typeaheadSelected=function(e){o.criteria.brand=e,o.search(!0)},o.share=function(e){o.shared=e},o.shared=null}t.$inject=["$scope","$modal","$state","searchParams","besafe"],e.controller("SearchCtrl",t)}(angular.module("app.search")),function(e){function t(e,t,a,n){var r=this;r.email=null,r.subscribe=function(){var i=t.href("app.email.unsubscribe",null,{absolute:!0});n.subscribe(r.email,e.query,i).then(function(e){a.close(),alert("You will now receive email notifications from BE Safe.")},function(e){a.close(),alert("There was an error requesting the subscription.\n\n"+e.message)})},r.cancel=function(){a.dismiss()}}t.$inject=["$scope","$state","$modalInstance","besafe"],e.controller("SubscriptionCtrl",t)}(angular.module("app.search")),function(e){function t(e,t,a){function n(){return a({method:"GET",url:"/api/version"}).then(function(e){return e.data})}function r(e){return a({method:"GET",url:"/api/drugs",params:e}).then(function(e){return e.data},function(e){alert("The search request failed. Please check your browser log.")})}function i(){return a({method:"GET",url:"/api/carousel"}).then(function(e){return e.data})}function s(){return a({method:"GET",url:"/api/carousel/terms"}).then(function(e){return e.data})}function o(t,n,r){return a({method:"PUT",url:"/api/subscribe",data:{email:t,query:n,unsubscribeLink:r}}).then(function(e){},function(t){return e.reject("There was an error requesting the subscription.\n\n"+t.message)})}function u(t){return a({method:"DELETE",url:"/api/unsubscribe/"+t}).then(function(e){return e.data},function(t){return e.reject(t.message)})}return{version:n,search:r,images:i,names:s,subscribe:o,unsubscribe:u}}t.$inject=["$q","strformat","jsend"],e.factory("besafe",t)}(angular.module("app")),function(e){function t(e,t,a){var n=this;n.version="unknown",a.version().then(function(e){n.version=e}),n.isCollapsed=!0}t.$inject=["$scope","$state","besafe"],e.controller("HeaderCtrl",t)}(angular.module("app"));