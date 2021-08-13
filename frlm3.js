/*



		ALERTA: Ao acessar este documento, você foi condenado por INSIDER INFORMATION
		Volte ao carga de Estagiário quando retornar ao jogo.




*/

var jogo = {

	metas: {
		estag: 50,
		ponta: 12,
		trd_jr: 1000000
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
			this.calcular_cargo();
		} else {
			this.calcular_cargo();
		}
	},
	
	atualizar_barras_progresso: function () {
		document.getElementById("p_estag").value = localStorage.getItem('operacoes');
		document.getElementById("p_estag").max = this.metas.estag;
		document.getElementById("p_ponta").value = localStorage.getItem('dias_ponta');
		document.getElementById("p_ponta").max = this.metas.ponta;
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
		
	}
	
}