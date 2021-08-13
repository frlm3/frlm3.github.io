/*



		ALERTA: Ao acessar este documento,
		você foi condenado por INSIDER INFORMATION


*/
var dev_tools = {
	
	reset: function(){
		localStorage.setItem('cargo', 0);
		localStorage.setItem('operacoes', 0);
		localStorage.setItem('dias_ponta', 0);
		localStorage.setItem('dias_total', 0);
		localStorage.setItem('lucro_trdjr', 0);
		localStorage.setItem('lucro_trdsr', 0);
		jogo.calcular_cargo();
	}
	

}


var jogo = {

	metas: {
		estag: 50,
		ponta: 12,
		trd_jr: 1000000,
		trd_sr: 2500000
	},
	
	cargos: [
		'Estagiário',
		'Ponta-de-mesa',
		'Trader Jr.'
	],
	
	inicia_storage: function () {
		if(!localStorage.getItem('cargo')) {
			localStorage.setItem('cargo', 0);
			localStorage.setItem('operacoes', 0);
			localStorage.setItem('dias_ponta', 0);
			localStorage.setItem('dias_total', 0);
			localStorage.setItem('lucro_trdjr', 0);
			localStorage.setItem('lucro_trdsr', 0);
			jogo.calcular_cargo();
		} else {
			jogo.calcular_cargo();
		}
	},
	
	atualizar_barras_progresso: function () {
		document.getElementById("p_estag").value = localStorage.getItem('operacoes');
		document.getElementById("p_estag").max = jogo.metas.estag;
		document.getElementById("p_ponta").value = localStorage.getItem('dias_ponta');
		document.getElementById("p_ponta").max = jogo.metas.ponta;
		document.getElementById("p_trdjr").value = parseInt(localStorage.getItem('lucro_trdjr'));
		document.getElementById("p_trdjr").max = jogo.metas.trd_jr;
		document.getElementById("p_trdsr").value = parseInt(localStorage.getItem('lucro_trdsr'));
		document.getElementById("p_trdsr").max = jogo.metas.trd_sr;
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
		
	}
	
}