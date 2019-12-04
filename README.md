
# Players

  

Minha API de aprendizado,

  

Com ela você pode gerenciar seu grupo de amigos gamers, por exemplo.

  

## Operações de autenticação

*  **Sign In** de um user-admin cadastrado:

	* **METHOD**: *POST*

	*  **URL**: http://localhost:PORT/login/

  

*  **Sign Up** para cadastrar um user-admin:

	*  **METHOD**: *POST*

	*  **URL**: http://localhost:PORT/singup

  
  

## CRUD para usuário autenticado

  
  

*  **Adicionar**

	*  **METHOD**: *POST*

	*  **URL**:

		http://localhost:PORT/players/create-player - Adiciona um player

*  **Listar**

	*  **METHOD**: *GET*

	*  **URLS**:

		http://localhost:PORT/players/ - Lista todos os players

		http://localhost:PORT/players/:id - Lista player específico

		http://localhost:PORT/games/:game - Listar players de um game

*  **Remover**

	*  **METHOD**: *DELETE*

	*  **URL**:
	
		http://localhost:PORT/players/:id - Remove um player

		http://localhost:PORT/:id/games/:game - Remove games de um player

*  **Editar**

	*  **METHOD**: *PUT*

	*  **URL**:

		http://localhost:PORT/players/:id - alteração em nome ou games

## License

[MIT](https://choosealicense.com/licenses/mit/)