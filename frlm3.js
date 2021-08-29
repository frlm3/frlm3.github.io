/*
		INSIDER INFORMATION
*/
var n = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, }),
	q = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0, });
	
var dev_tools = {
	
	reset: function(){
		localStorage.setItem('cargo', 0);
		localStorage.setItem('operacoes', 0);
		localStorage.setItem('dias_ponta', 0);
		localStorage.setItem('dias_total', 0);
		localStorage.setItem('lucro_trdjr', 0);
		localStorage.setItem('lucro_trdsr', 0);
		localStorage.setItem('lucro_head', 0);
		jogo.calcular_cargo();
	}
	
}

var jogo = {

	metas: {
		estag: 50,
		ponta: 9,
		trd_jr: 1000000,
		trd_sr: 2500000,
		head: 100000
	},
	
	cargos: [
		'Estagiário',
		'Ponta-de-mesa',
		'Trader Jr.',
		'Trader Sr.',
		'Head Trader'
	],
	
	inicia_storage: function () {
		if(!localStorage.getItem('cargo')) {
			localStorage.setItem('cargo', 0);
			localStorage.setItem('operacoes', 0);
			localStorage.setItem('dias_ponta', 0);
			localStorage.setItem('dias_total', 0);
			localStorage.setItem('lucro_trdjr', 0);
			localStorage.setItem('lucro_trdsr', 0);
			localStorage.setItem('lucro_head', 0);
			jogo.calcular_cargo();
		} else {
			jogo.calcular_cargo();
		}
	},
	
	atualizar_barras_progresso: function () {
		
		// Número de operações realizadas
		var num_ope = localStorage.getItem('operacoes');
		document.getElementById("p_estag").value = num_ope;
		document.getElementById("p_estag").max = jogo.metas.estag;
		out(num_ope, "num_ope");

		// Número de pregões
		var num_preg = localStorage.getItem('dias_ponta');
		document.getElementById("p_ponta").value = num_preg;
		document.getElementById("p_ponta").max = jogo.metas.ponta;
		out(num_preg, "num_preg");
		
		// Lucro Total
		var lucro_total = parseInt(localStorage.getItem('lucro_trdjr'));
		document.getElementById("p_trdjr").value = lucro_total;
		document.getElementById("p_trdjr").max = jogo.metas.trd_jr;
		out(q.format(lucro_total/1000), "lucro_total");
		
		// Prejuízo total
		var prejuizo_total = parseInt(localStorage.getItem('lucro_trdsr'));
		document.getElementById("p_trdsr").value = prejuizo_total;
		document.getElementById("p_trdsr").max = jogo.metas.trd_sr;
		out(q.format(prejuizo_total/1000), "prejuizo_total");
		
		var lucro_max = parseInt(localStorage.getItem('lucro_head'));
		document.getElementById("p_head").value = lucro_max;
		document.getElementById("p_head").max = jogo.metas.head;
	},
	
	calcular_cargo: function () {
		
		var cargo_atual = parseInt(localStorage.getItem('cargo'));
		switch (true) {
			case cargo_atual == 0: // Estagiário
				if(parseInt(localStorage.getItem('operacoes')) > jogo.metas.estag){
					cargo_atual = 1;
				}
				break;
				
			case cargo_atual == 1: // Ponta-de-mesa
				if(parseInt(localStorage.getItem('dias_ponta')) > jogo.metas.ponta){
					cargo_atual = 2;
				}
				break;
		}
		localStorage.setItem('cargo', cargo_atual);
		out(jogo.cargos[cargo_atual], 'cargo');
		
	},
	
	stop_loss: function () {
		
		alert("Seu stop loss foi acionado! Cuidados com as posições vendidas...");
		localStorage.setItem('cargo', 0);
		localStorage.setItem('operacoes', 0);
		localStorage.setItem('dias_ponta', 0);
		localStorage.setItem('dias_total', 0);
		finalizar_jogo();
		
	},
	
	choque: function (prob) {
	
			 if(prob < 0.02) return 0.7500;
		else if(prob < 0.98) return 1.0000;
		else				 return 1.3333;

	}
	
	
}