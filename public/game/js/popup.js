function Popup(){
	this.popup = "";
	this.visible = false;
	this.corpo = "";
	this.createDiv =  function (x,y,w,h,titolo,tipo){
		/*
			
			<div class='popup'>
				<div id='titolo' onmousedown="mouseCtrl(document.getElementsByClassName('popup')["+tipo+"],document.getElementById('"+titolo+"'))">
					<h2>titolo <button id='close'>X</button></h2>
				</div>
				<div id='testo'>
					<div id="corpo0/1">
						//qui andrà il testo del popup
					</div>
				</div>
			</div>
		*/
		this.popup = document.createElement("div");
		this.popup.style.width=((w/1000)*WIDTH)/SCALE+"px";
		this.popup.style.height=((h/1000)*HEIGHT)+"px";
		this.popup.setAttribute("class","popup");
		var tit	= document.createElement("div");
		var h2 = document.createElement("h2");
		var t = document.createTextNode(titolo);
		var b = document.createElement("button");
		b.setAttribute("onclick","chiudi("+tipo+")");
		b.setAttribute("id","close");
		b.innerHTML = "X";
		h2.appendChild(b);
		h2.appendChild(t);
		tit.setAttribute("id",titolo);
		tit.setAttribute("onmousedown","mouseCtrl("+tipo+",this)");
		tit.appendChild(h2);
		this.popup.appendChild(tit);
		var testo = document.createElement("div");
		testo.setAttribute("id","testo");
		testo.style.height=(((h/1000)*HEIGHT)-30)+"px";
		this.corpo = document.createElement("div");
		this.corpo.setAttribute("id","corpo"+tipo);
		testo.appendChild(this.corpo);
		this.popup.appendChild(testo);
		this.popup.style.left = (x/1000)*WIDTH+"px";
		this.popup.style.top = (y/1000)*HEIGHT+"px";
		document.body.appendChild(this.popup);
	};
	this.setText = function(testo){
		var p = document.createElement("p");
		var tes = document.createTextNode(testo);
		p.appendChild(tes);
		this.corpo.appendChild(p);
	};
	this.setVisible = function(b){
		this.visible = b;
		this.popup.style.display = this.visible ? "block" : "none";
	};
	this.isVisible = function(){
		return this.visible;
	}
}
