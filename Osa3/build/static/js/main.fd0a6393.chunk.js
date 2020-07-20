(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},19:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),c=n.n(o),u=(n(19),n(2)),l=function(e){var t=e.text;return r.a.createElement("h2",null,t)},i=function(e){var t=e.valueHandlerFilter,n=e.filter,a=e.text;return r.a.createElement("form",null,r.a.createElement("div",null,r.a.createElement("p",null,a),r.a.createElement("input",{onChange:t,value:n})))},s=function(e){var t=e.submitHandler,n=e.valueHandlerName,a=e.newName,o=e.valueHandlerNumber,c=e.newNumber,u=e.setNewName,l=e.typed,i=e.text;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,r.a.createElement("h2",null,i),"name: ",r.a.createElement("input",{onChange:n,value:a,onClick:function(e){l||u("")}}),"number: ",r.a.createElement("input",{onChange:o,value:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add")))},m=n(3),d=n.n(m),f="/api/persons",h=function(){return console.log("frontend service get all"),d.a.get(f).then((function(e){return e.data}))},b=function(e){return console.log("frontend service create"),d.a.post(f,e).then((function(e){return e.data}))},p=function(e,t){return console.log("frontend service update"),d.a.put("".concat(f,"/").concat(e),t).then((function(e){return e.data}))},v=function(e){return console.log("frontend service remove"),d.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},g=function(e){var t=e.persons,n=e.filter,a=e.setPersons,o=e.text,c=e.setMessage,u=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return r.a.createElement("div",null,t.length>0?r.a.createElement("h2",null,o):r.a.createElement("h5",null,"Here you could see list of people with their numbers.. when you first add some ones to the list!"),u.map((function(e,t){return r.a.createElement("h3",{key:t},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return function(e){window.confirm("Do you really want to remove ".concat(e.name," from phonebook?"))&&v(e.id).then((function(t){h().then((function(e){a(e)})).then(c("Removed ".concat(e.name,"'s from phonebook")),setTimeout((function(){c(null)}),5e3))}))}(e)}},"Remove"))})))},w=function(e){var t=e.message,n=e.errorMessage;return t?r.a.createElement("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},r.a.createElement("h3",null,t)):n?r.a.createElement("div",{style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},r.a.createElement("h3",null,n)):null},E=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)("Write name..."),m=Object(u.a)(c,2),d=m[0],f=m[1],v=Object(a.useState)(!1),E=Object(u.a)(v,2),y=E[0],O=E[1],j=Object(a.useState)(""),S=Object(u.a)(j,2),k=S[0],N=S[1],x=Object(a.useState)(""),C=Object(u.a)(x,2),H=C[0],M=C[1],R=Object(a.useState)(""),T=Object(u.a)(R,2),B=T[0],J=T[1],L=Object(a.useState)(""),P=Object(u.a)(L,2),A=P[0],F=P[1];Object(a.useEffect)((function(){h().then((function(e){o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement(l,{text:"Phonebook"}),r.a.createElement(w,{message:B,errorMessage:A}),r.a.createElement(i,{valueHandlerFilter:function(e){return M(e.target.value)},filter:H,text:"Filter shown with"}),r.a.createElement(s,{submitHandler:function(e){e.preventDefault();var t={name:d,number:k};n.every((function(e){return e.name.toLowerCase()!==d.toLowerCase()}))?(f(""),N(""),b(t).then((function(e){e.name&&(h().then((function(e){return o(e)})),console.log("successResponse",e),J("Added ".concat(d,", ").concat(k)),setTimeout((function(){J(null)}),6e3))})).catch((function(e){F("Error happened when tried to add new person and number! ".concat(JSON.stringify(e.response.data))),setTimeout((function(){F(null)}),15e3)}))):n.find((function(e){return e.number===k}))?alert("".concat(d," with this same phonenumber is already added to phonebook")):window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one?"))&&h().then((function(e){var a=e.filter((function(e){return e.name===d}))[0].id;p(a,t).then((function(e){var t=n.filter((function(e){return e.name!==d})).concat(e);o(t)})).then(J("Changed ".concat(d,"'s phonenumber to ").concat(k)),setTimeout((function(){J(null)}),5e3))})).catch((function(e){F("Error happened when tried to change phonenumber of existing person! ".concat(JSON.stringify(e.response.data))),setTimeout((function(){F(null)}),5e3)}))},valueHandlerName:function(e){f(e.target.value),O(!0)},newName:d,valueHandlerNumber:function(e){return N(e.target.value)},newNumber:k,setNewName:f,typed:y,text:"Add a new"}),r.a.createElement(g,{persons:n,setPersons:o,filter:H,text:"People and their numbers",setMessage:J}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.fd0a6393.chunk.js.map