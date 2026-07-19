# Driving Test Companion — Contexto para o Codex do VS Code

## Como colaborar com o desenvolvedor

- O desenvolvedor está aprendendo React Native e quer executar os comandos pessoalmente.
- Trabalhe em passos pequenos: explique o conceito, forneça um comando ou alteração, peça para testar e só depois avance.
- Explique TypeScript, React, Expo, NativeWind e Git quando aparecerem no código.
- Não gere grandes blocos de funcionalidades sem explicar as decisões.
- Use Conventional Commits e branches por funcionalidade.
- Idioma da conversa: português. Textos visíveis no aplicativo: inglês.

## Produto

O **Driving Test Companion** é um aplicativo Android/iOS que conecta alunos e instrutores de direção na Irlanda.

Funcionalidades do MVP:

- autenticação de aluno e instrutor;
- convite e vínculo entre instrutor e aluno;
- data e local do driving test;
- aulas regulares, extras, mock tests e pre-test;
- solicitação e aprovação de aulas extras;
- avaliações por habilidade;
- progresso do aluno;
- conteúdo de estudo e quizzes;
- checklist do dia do teste;
- Google Calendar e notificações.

Perfis planejados:

```text
STUDENT
INSTRUCTOR
ADMIN
```

## Stack definida

```text
Mobile: React Native + TypeScript + Expo
Navegação: Expo Router
Estilos: NativeWind 4 + Tailwind CSS 3
Gestos: React Native Gesture Handler
Animações: React Native Reanimated
Backend futuro: Java + Spring Boot
Banco futuro: PostgreSQL
Infraestrutura futura: AWS
```

Versões confirmadas no projeto:

```text
Expo: 54.0.35
React Native: 0.81.x
React: 19.1.x
Expo Router: 6.0.24
NativeWind: 4.2.6
react-native-css-interop: 0.2.6
babel-preset-expo: 54.0.11
Node recomendado no ambiente: 22 LTS via NVM
```

## Atenção: erro de Babel já resolvido

O projeto chegou a instalar diretamente `babel-preset-expo@57.0.2` enquanto usava Expo SDK 54. Isso gerou no Hermes:

```text
[runtime not ready]: SyntaxError: private properties are not supported
```

A solução foi alinhar as versões:

```bash
npm uninstall babel-preset-expo
npm install --save-dev babel-preset-expo@54.0.11
npx expo start --clear
```

Não atualize `babel-preset-expo` isoladamente. Dependências do Expo devem ser instaladas preferencialmente com:

```bash
npx expo install <pacote>
```

## NativeWind

Arquivos configurados:

```text
global.css
babel.config.js
metro.config.js
tailwind.config.js
nativewind-env.d.ts
```

O `app/_layout.tsx` deve importar:

```tsx
import '../global.css';
```

Tokens de marca definidos no Tailwind:

```js
brand: {
  50: '#E8F2FF',
  500: '#1677E8',
  900: '#08275A',
}
```

Use classes como:

```text
bg-brand-900
bg-brand-500
text-brand-50
```

Para transparência somente no fundo, use `bg-white/90`. Não use `opacity-90` no pai, pois isso também afeta os filhos.

## Estrutura de rotas desejada

```text
app/
├── _layout.tsx
├── index.tsx
├── (auth)/
│   ├── _layout.tsx
│   ├── onboarding.tsx
│   ├── login.tsx
│   └── register.tsx
└── (tabs)/
    ├── _layout.tsx
    ├── index.tsx
    └── explore.tsx
```

Responsabilidades:

- `app/index.tsx`: porta de entrada; redireciona para onboarding, login ou tabs.
- `(auth)`: telas sem barra inferior.
- `(tabs)`: telas autenticadas com barra de abas.
- `app/(tabs)/index.tsx`: futuramente será o dashboard do aluno.

O `app/index.tsx` temporário pode ser:

```tsx
import { Redirect } from 'expo-router';

export default function IndexScreen() {
  return <Redirect href="/onboarding" />;
}
```

Os grupos entre parênteses não aparecem na URL:

```tsx
router.push('/login');
router.push('/register');
router.replace('/(tabs)');
```

Remover do template, se ainda existir:

```tsx
export const unstable_settings = {
  anchor: '(tabs)',
};
```

## Componentes criados ou planejados

### PrimaryButton

Local esperado:

```text
components/ui/primary-button.tsx
```

Deve reutilizar `PressableProps`, preferencialmente:

```tsx
type PrimaryButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
};
```

### FormInput

Local atual informado pelo desenvolvedor:

```text
components/ui/formInput.tsx
```

Recebe `TextInputProps` mais:

```tsx
type FormInputProps = TextInputProps & {
  label: string;
  error?: string;
};
```

## Onboarding

Há três slides em inglês:

```tsx
const slides = [
  {
    title: 'Get ready for your driving test',
    description:
      'Track your lessons, receive feedback, and study helpful content so you feel confident on test day.',
  },
  {
    title: 'Detailed lessons and assessments',
    description:
      'Your instructor records your performance and follows the development of each driving skill.',
  },
  {
    title: 'Progress that leads to a pass',
    description:
      'Set goals, practise, take mock tests, and monitor your progress.',
  },
];
```

Os emojis devem ser substituídos por PNGs locais usando:

```tsx
<Image source={slide.image} className="h-48 w-48" resizeMode="contain" />
```

O onboarding utiliza `useState` e deve aceitar swipe horizontal com `Gesture.Pan()` e `GestureDetector`.

O layout raiz deve estar envolvido por:

```tsx
<GestureHandlerRootView style={{ flex: 1 }}>
  {/* navegação */}
</GestureHandlerRootView>
```

## Login

O Login usa:

- imagem de fundo `assets/images/backgroudmain.png`;
- `ImageBackground` externo ocupando toda a tela;
- overlay `bg-black/20`;
- formulário na parte inferior com `mt-auto`;
- card `bg-white/90`, sem aplicar `opacity` ao pai;
- validação local de e-mail e senha;
- senha mínima de 8 caracteres;
- `KeyboardAvoidingView`;
- `SafeAreaView` superior e inferior.

Não colocar `ImageBackground` dentro de um `SafeAreaView` branco. A imagem deve ser o elemento externo para cobrir as áreas superior e inferior.

`StatusBar` deve ser importado de:

```tsx
import { StatusBar } from 'expo-status-bar';
```

O botão deve chamar:

```tsx
<PrimaryButton title="Sign in" onPress={handleLogin} />
```

## Splash screen

Configurar através do plugin `expo-splash-screen` no `app.json`, usando:

```text
assets/images/splash-icon.png
backgroundColor: #08275A
resizeMode: contain
```

Não criar uma rota React para simular a splash nativa.

## Cadastro — etapa atual

Próxima funcionalidade em desenvolvimento:

```text
app/(auth)/register.tsx
```

O cadastro deve conter:

- seleção `STUDENT | INSTRUCTOR`;
- nome completo;
- e-mail;
- senha;
- confirmação da senha;
- aceite dos termos;
- validação local;
- link para Login.

Tipo já explicado:

```tsx
type AccountRole = 'STUDENT' | 'INSTRUCTOR';
const [role, setRole] = useState<AccountRole>('STUDENT');
```

O desenvolvedor está estudando Rules of Hooks. Mantenha Hooks no nível superior do componente e explique por que a ordem das chamadas precisa ser estável.

## Git

Usar Conventional Commits:

```text
feat(auth): add login screen
feat(onboarding): add initial onboarding screen
fix(build): align babel preset with expo sdk 54
chore(styles): configure nativewind
refactor(ui): extract primary button component
```

Branches:

```text
feat/onboarding
feat/register
fix/<descricao>
```

Fluxo recomendado antes de cada commit:

```bash
git status --short
git diff
git add <arquivos da funcionalidade>
git commit -m "tipo(escopo): descrição"
```

Não adicionar `node_modules` ao Git.

## Próximos passos

1. Concluir `register.tsx` com campos e validação.
2. Criar tela de recuperação de senha.
3. Criar `AuthContext` com `user`, `isAuthenticated`, `signIn` e `signOut`.
4. Criar proteção de rotas entre `(auth)` e `(tabs)`.
5. Persistir onboarding e sessão localmente.
6. Usar `expo-secure-store` para o token quando o backend estiver disponível.
7. Substituir o Home temporário pelo dashboard do aluno.
8. Iniciar a API Spring Boot de autenticação.

## Regra de trabalho

Antes de implementar a próxima etapa, inspecione os arquivos reais do projeto, execute `git status --short` e confirme as versões no `package.json`. Não presuma que todos os trechos deste documento foram aplicados; alguns foram ensinados durante a conversa e podem ainda estar pendentes.
