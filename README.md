## Sobre

**SharpCut** é projeto é composto por um aplicativo móvel desenvolvido em React Native com o auxílio da plataforma Expo e do TypeScript, e uma API desenvolvida em Node.js com o framework Fastify e também utilizando TypeScript. 

A base de dados foi construída com MongoDb e Prisma e o servidor da API foi hosteado pelo EC2 da AWS

A combinação dessas tecnologias permitiu uma experiência de desenvolvimento ágil e escalável.

## Eu construí o APP de ponta a ponta e claro não podia falta o Design no Figma! Segue o link para conferir: <a href="https://www.figma.com/file/dQGgpP6ZoErJ4U79iMfNvM/SharpCut-Mobile-Design?node-id=0%3A1&t=VY0GwgB6jG8K4XmQ-1" >Clique aqui!</a>

## Para aqueles que quiserem testar o aplicativo:

Ele está completamente funcional basta baixar o **APK** dele e rodar no seu celular, eu não posso colocar na **Google playstore** por quê preciso pagar pela minha conta de desenvolvedor, e por enquanto vai ser apenas APK porquê também não tenho conta de **desenvolvedor IOS**, então nem adianta tentar buildar um arquivo **IPA**, que sem o registro nínguem vai conseguir abrir.

## Mas pode utilizar enquanto os servidores estão no ar: <a href="https://expo.dev/artifacts/eas/jkkjNHTcieRrjfPnwdxcbb.apk" >SharpCut BarberShop</a>

## Utilização

O aplicativo móvel foi desenvolvido com o objetivo de fornecer aos usuários uma experiência de agendamentos para serviços de barbearia, com a possibilidade de gerar leads para venda e prospecção de clientes.

Para isso a tela chave do aplicativo é a de agendamentos, onde quando o usuário está logado ele consegue escolher um dia específico, escolher um serviço que deseja usufruir, escolher o barbeiro que vai lhe atender e por fim para confirmar o agendamento o usuário deve escolher um dos horarios disponíveis que o barbeiro disponibilizou.

A API foi desenvolvida com segurança e encriptação de dados de ponta a ponta, com as mais diversas funções como por exemplo rotas de usuário para acessar páginas destinadas à usuários, rotas de admnistradores com rotas para painel de controle, dos barbeiros e dos gerentes da barbearia, rotas de datas, horários, perfis de barbeiros.

O aplicativo possue três telas, para usuários não logados e para usuários logados e para painel de admnistrador, assim que o usuário entra no aplicativo ele pode navegar pelo aplicativo até que ele entre na agenda ou tente fazer um agendamento, em um desses dois ele vai receber a oportunidade ou de se logar com Google ou se registrar ou continuar com o email, então ele vai ser direcionado ou pra tela de login ou de registro.

No momento que o usuário está logado ele abre a opção poder agendar um horário em um dia específico, para um serviço específico com o barbeiro que desejar, logado o usuário também pode ver sua agenda agora, caso tenha agendamentos poderá ver, se não tiver agendamentos ele é avisado e tem um botão pra levar ele à agendar um horário.

Quando o usuário está logado ele também libera a opção de ver uma Sidebar, onde tem toda customização de perfil e mais uma navegação simplificada entre as telas.

Se o usuário estiver logado e for um admnistrador no banco de dados, ele consegue entrar em uma tela de gerenciamento, onde pode ver todos os usuários, pode promover ou deletar os usuários, ele pode adcionar os horários disponíveis para os barbeiros específicos, e também tem todo o histórico de agendamentos que foram feitos.

## O projeto é composto por:

- **API única:** Uma API desenvolvida especificamente para esse projeto, com intuito de ser extremamente funcional e segura;

- **Registro, Login e controle de perfil:** Usuário tem a possibilidade de se registrar, se logar, mudar os dados do perfil, adcionar mais informações como endereço por exemplo, e também com a funcionalidade de troca de foto do perfil;

- **Banco de dados:** Banco de dados desenvolvido com MongoDb e Prisma, para agilizar ainda mais o processo da criação de tabelas e unificação da minha API, onde as principais tabelas são as de Usuário, de Agendamentos e de Barbeiros;

- **S3 AWS:** Para controlar as fotos de perfil dos usuários eu optei por em vez de salvar localmente no dispositivo a foto escolhida, ou salvar no meu próprio banco de dados , eu criei um bucket no S3 da AWS para armazenar em uma pasta específica com o nome do usuário que salvou a foto, e no meu banco de dados eu salvo apenas o URI na tabela de usuário, então assim eu diminuí drasticamente o uso do meu espaço no banco de dados para controle de fotos.

- **AWS EC2:** Para hospedar minha API em um servidor para rodar 24/7, eu usei o EC2 da AWS, criei uma VM com ubuntu e conectei com a instanância que havia criado do EC2 por conexão ssh, então clonei minha API para dentro da VM e rodei com a biblioteca PM2

- **Recuperação de senha:** Para aqueles usuários que esqueceram suas senhas, criei um sistema que o usuário pode clicar em "esqueci minha senha" na tela de login e então vai ser redirecionado para a tela de dizer o email dele, logo o aplicativo ja verifica se esse email existe na base de dados, caso não exista ele diz para o usuário que o email pode estar inválido, caso seja um email existente, o aplicativo usando os serviços do MAILGUN vai disparar um email com um código de recuperação para o usuário trocar a senha.

- **Google Auth:** O usuário tem a possibilidade de se registrar com uma conta google e sempre se logar com a mesma apenas clicando em "Continuar com Google", essa implementação ajuda muito aqueles usuários que preferem a praticidade ao se registrar e logar.

- **Google Maps:** Nos botões da homepage o usuário tem a possibilidade de clicar em um botão "Abrir mapa", então vai abrir o aplicativo do google maps para localizar onde fica a barbearia

- **AWS EC2:** Para hospedar minha API em um servidor para rodar 24/7, eu usei o EC2 da AWS, criei uma VM com ubuntu e conectei com a instanância que havia criado do EC2 por conexão ssh, então clonei minha API para dentro da VM e rodei com a biblioteca PM2


## Principais tecnologias utilizadas:

<div>
    <img src="https://img.shields.io/badge/TYPESCRIPT-000B1D?style=for-the-badge&logo=TYPESCRIPT&logoColor=white" />
    <img src="https://img.shields.io/badge/node.js-000B1D?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/react_native-000B1D.svg?style=for-the-badge&logo=react&logoColor=%white" /> 
    <img src="https://img.shields.io/badge/Prisma-000B1D?style=for-the-badge&logo=Prisma&logoColor=white" /> 
    <img src="https://img.shields.io/badge/MongoDB-000B1D.svg?style=for-the-badge&logo=mongodb&logoColor=white" /> 
    <img src="https://img.shields.io/badge/EXPO-000B1D.svg?style=for-the-badge&logo=expo&logoColor=white" /> 
    <img src="https://img.shields.io/badge/AWS-000B1D.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" />
    <img src="https://img.shields.io/badge/GOOGLE-000B1D.svg?style=for-the-badge&logo=google&logoColor=white" /> 
  
</div>

## Engenharia de usabilidade e acessibilidade do aplicativo <br>

Para garantir a melhor experiência de usuário possível, o aplicativo foi desenvolvido com base em conceitos de engenharia de usabilidade, tornando a interação com ele intuitiva e eficiente. Além disso, a acessibilidade foi um requisito fundamental durante o processo de desenvolvimento, com a inclusão de recursos que permitem que todas as pessoas possam utilizar o aplicativo, independentemente de suas habilidades físicas ou cognitivas.

## Grandes dificuldades encontradas:

   Trabalhar com datas e horários é bem complicado e massante, acaba sendo bem chato, porém o resultado é sempre muito legal
   
   Responsividade para todos os dispositivos, eu criei desde o inicio o frontend com o máximo de valores "Flex" para que a tela fosse responsiva na maioria       dos dispositivos móveis, mas acredito que eu poderia ter dado mais atenção a essa questão.
   
## Melhorias que podem ser implementadas:

- **1)**    A coisa que mais me incomodou foi a questão da sidebar, quando eu criei a sidebar para o projeto, eu não sabia que o expo e o react native tinha     bibliotecas que ja tinham Sidebar pronta, e a que eu fiz ficou realmente bem ruim, por quê ela é ativada pelo componente Header e ela fica no mesmo nível do componente pai do Header, e isso acaba com que gera um bug de atualizações quando algo que realizado na tela, como uma troca de foto de perfil, e também impede que o usuario clique fora da sidebar em uma tela "Pai" e feche a sidebar. Isso teria como ser arrumado com uso do Redux, ou usado direto uma sidebar pronta.

- **2)**    No momento as eu tive que tirar as funções da minha API para quando os barbeiros selecionassem os horarios, para que fosse baseado em algum dia específico, isso acaba gerando um problema que todos os dias os mesmos horários que os barbeiros selecionam ficam disponíveis.

---

<table>
    <td>
      Feito por <a href="https://github.com/Mazzotti1">Gabriel Mazzotti</a>
    </td>
</table>

