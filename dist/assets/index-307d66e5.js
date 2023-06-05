function M(e,a){if(a.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+a.length+" present")}function w(e){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?w=function(t){return typeof t}:w=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(e)}function c(e){M(1,arguments);var a=Object.prototype.toString.call(e);return e instanceof Date||w(e)==="object"&&a==="[object Date]"?new Date(e.getTime()):typeof e=="number"||a==="[object Number]"?new Date(e):((typeof e=="string"||a==="[object String]")&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn(new Error().stack)),new Date(NaN))}var I={};function j(){return I}function N(e){var a=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return a.setUTCFullYear(e.getFullYear()),e.getTime()-a.getTime()}function L(e,a){M(2,arguments);var t=c(e),n=c(a),r=t.getTime()-n.getTime();return r<0?-1:r>0?1:r}var V={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},Y=function(a,t,n){var r,i=V[a];return typeof i=="string"?r=i:t===1?r=i.one:r=i.other.replace("{{count}}",t.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r};const q=Y;function W(e){return function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=a.width?String(a.width):e.defaultWidth,n=e.formats[t]||e.formats[e.defaultWidth];return n}}var J={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},U={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},X={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},$={date:W({formats:J,defaultWidth:"full"}),time:W({formats:U,defaultWidth:"full"}),dateTime:W({formats:X,defaultWidth:"full"})};const Q=$;var H={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},B=function(a,t,n,r){return H[a]};const G=B;function y(e){return function(a,t){var n=t!=null&&t.context?String(t.context):"standalone",r;if(n==="formatting"&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,l=t!=null&&t.width?String(t.width):i;r=e.formattingValues[l]||e.formattingValues[i]}else{var o=e.defaultWidth,m=t!=null&&t.width?String(t.width):e.defaultWidth;r=e.values[m]||e.values[o]}var u=e.argumentCallback?e.argumentCallback(a):a;return r[u]}}var K={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},Z={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},ee={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},te={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},ae={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},ne={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},re=function(a,t){var n=Number(a),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},ie={ordinalNumber:re,era:y({values:K,defaultWidth:"wide"}),quarter:y({values:Z,defaultWidth:"wide",argumentCallback:function(a){return a-1}}),month:y({values:ee,defaultWidth:"wide"}),day:y({values:te,defaultWidth:"wide"}),dayPeriod:y({values:ae,defaultWidth:"wide",formattingValues:ne,defaultFormattingWidth:"wide"})};const oe=ie;function b(e){return function(a){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.width,r=n&&e.matchPatterns[n]||e.matchPatterns[e.defaultMatchWidth],i=a.match(r);if(!i)return null;var l=i[0],o=n&&e.parsePatterns[n]||e.parsePatterns[e.defaultParseWidth],m=Array.isArray(o)?se(o,function(f){return f.test(l)}):ue(o,function(f){return f.test(l)}),u;u=e.valueCallback?e.valueCallback(m):m,u=t.valueCallback?t.valueCallback(u):u;var h=a.slice(l.length);return{value:u,rest:h}}}function ue(e,a){for(var t in e)if(e.hasOwnProperty(t)&&a(e[t]))return t}function se(e,a){for(var t=0;t<e.length;t++)if(a(e[t]))return t}function le(e){return function(a){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=a.match(e.matchPattern);if(!n)return null;var r=n[0],i=a.match(e.parsePattern);if(!i)return null;var l=e.valueCallback?e.valueCallback(i[0]):i[0];l=t.valueCallback?t.valueCallback(l):l;var o=a.slice(r.length);return{value:l,rest:o}}}var de=/^(\d+)(th|st|nd|rd)?/i,me=/\d+/i,fe={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},he={any:[/^b/i,/^(a|c)/i]},ce={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},ve={any:[/1/i,/2/i,/3/i,/4/i]},ge={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},ye={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},be={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},we={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},pe={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},Me={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Pe={ordinalNumber:le({matchPattern:de,parsePattern:me,valueCallback:function(a){return parseInt(a,10)}}),era:b({matchPatterns:fe,defaultMatchWidth:"wide",parsePatterns:he,defaultParseWidth:"any"}),quarter:b({matchPatterns:ce,defaultMatchWidth:"wide",parsePatterns:ve,defaultParseWidth:"any",valueCallback:function(a){return a+1}}),month:b({matchPatterns:ge,defaultMatchWidth:"wide",parsePatterns:ye,defaultParseWidth:"any"}),day:b({matchPatterns:be,defaultMatchWidth:"wide",parsePatterns:we,defaultParseWidth:"any"}),dayPeriod:b({matchPatterns:pe,defaultMatchWidth:"any",parsePatterns:Me,defaultParseWidth:"any"})};const Se=Pe;var De={code:"en-US",formatDistance:q,formatLong:Q,formatRelative:G,localize:oe,match:Se,options:{weekStartsOn:0,firstWeekContainsDate:1}};const We=De;function F(e,a){if(e==null)throw new TypeError("assign requires that input parameter not be null or undefined");for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t]);return e}function Te(e){return F({},e)}var k=1e3*60,p=60*24,x=p*30,C=p*365;function Ne(e,a,t){var n,r,i;M(2,arguments);var l=j(),o=(n=(r=t==null?void 0:t.locale)!==null&&r!==void 0?r:l.locale)!==null&&n!==void 0?n:We;if(!o.formatDistance)throw new RangeError("locale must contain localize.formatDistance property");var m=L(e,a);if(isNaN(m))throw new RangeError("Invalid time value");var u=F(Te(t),{addSuffix:Boolean(t==null?void 0:t.addSuffix),comparison:m}),h,f;m>0?(h=c(a),f=c(e)):(h=c(e),f=c(a));var P=String((i=t==null?void 0:t.roundingMethod)!==null&&i!==void 0?i:"round"),d;if(P==="floor")d=Math.floor;else if(P==="ceil")d=Math.ceil;else if(P==="round")d=Math.round;else throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");var S=f.getTime()-h.getTime(),v=S/k,O=N(f)-N(h),g=(S-O)/k,D=t==null?void 0:t.unit,s;if(D?s=String(D):v<1?s="second":v<60?s="minute":v<p?s="hour":g<x?s="day":g<C?s="month":s="year",s==="second"){var A=d(S/1e3);return o.formatDistance("xSeconds",A,u)}else if(s==="minute"){var E=d(v);return o.formatDistance("xMinutes",E,u)}else if(s==="hour"){var _=d(v/60);return o.formatDistance("xHours",_,u)}else if(s==="day"){var R=d(g/p);return o.formatDistance("xDays",R,u)}else if(s==="month"){var T=d(g/x);return T===12&&D!=="month"?o.formatDistance("xYears",1,u):o.formatDistance("xMonths",T,u)}else if(s==="year"){var z=d(g/C);return o.formatDistance("xYears",z,u)}throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'")}function ke(e,a){return M(1,arguments),Ne(e,Date.now(),a)}export{L as c,ke as f,N as g,M as r,c as t};
