# SmartWallet - AI Coding Agent Instructions

## Project Overview
React Native financial management app built with Expo Router, NativeWind (Tailwind CSS), and Nhost backend (GraphQL + Auth). Uses file-based routing with typed routes enabled.

## Architecture & Key Patterns

### Routing Structure
- **File-based routing** via Expo Router (see [app/\_layout.tsx](app/_layout.tsx))
- Route groups organize features: `(auth)` for authentication, `(tabs)` for main app navigation, `onboarding` for multi-step flows
- Navigation guards in [app/(tabs)/\_layout.tsx](app/(tabs)/_layout.tsx) - redirects to `/welcome` if not authenticated
- All Stack screens defined in root layout must have `headerShown: false` (custom headers implemented per screen)

### Authentication Flow
- **Nhost** handles all auth ([lib/nhost.ts](lib/nhost.ts)) with AsyncStorage for React Native persistence
- Login/signup use Nhost hooks: `useSignInEmailPassword`, `useSignUpEmailPassword`
- Pattern: Check `isSuccess`/`isError` in `useEffect` → navigate on success, show Alert on error (see [app/(auth)/login.tsx](app/(auth)/login.tsx))
- Protected routes check `useAuthenticationStatus()` → redirect unauthenticated users

### Styling Conventions
- **NativeWind v4** with custom color palette in [tailwind.config.js](tailwind.config.js):
  - `primary` (#00D9A3), `primary-dark` (#00B386) - main accent
  - `secondary` (#E8F7F3) - backgrounds/cards
  - `text-dark`, `text-gray`, `text-light` - typography hierarchy
- Use `cn()` utility from [lib/utils.ts](lib/utils.ts) to merge conditional classes (never manually concatenate)
- All components use `className` prop with Tailwind classes - no StyleSheet.create

### Component Patterns
- **Reusable components** in `/components` follow consistent API:
  - `className` prop for style overrides
  - `variant` prop for visual variations (e.g., Button: "primary" | "secondary")
  - Loading states via `loading` boolean + ActivityIndicator
- **Button** ([components/Button.tsx](components/Button.tsx)): Rounded full-width design, automatic opacity on disabled
- **Input** ([components/Input.tsx](components/Input.tsx)): Built-in password toggle with lucide-react-native icons, label + input grouped in View

### Import Paths
- Always use `@/` alias for imports (configured in [tsconfig.json](tsconfig.json)): `@/components/Button`, `@/lib/nhost`
- Never use relative paths like `../../components`

## Environment Setup
```bash
# Required: Configure Nhost credentials in .env (not committed)
EXPO_PUBLIC_NHOST_SUBDOMAIN=your-subdomain
EXPO_PUBLIC_NHOST_REGION=your-region
```

## Development Workflow
```bash
npm start              # Start Expo dev server
npm run android        # Launch Android emulator
npm run ios            # Launch iOS simulator  
npm run lint           # Run ESLint (config: eslint.config.js)
npm run reset-project  # Clear starter code (do NOT run on this project)
```

## Key Dependencies & Usage
- **@nhost/react**: Import hooks directly, wrap app in `NhostReactProvider` (already done in root layout)
- **lucide-react-native**: Icon library - import specific icons, pass `size` and `color` props
- **expo-router**: Use `useRouter()` for navigation (`push`, `replace`, `back`), `Redirect` component for guards
- **React Native Reanimated**: Available for animations (imported in root layout for gesture-handler compatibility)

## Common Tasks

### Adding a new screen
1. Create file in `app/` directory (e.g., `app/profile.tsx`)
2. Add `<Stack.Screen name="profile" />` to [app/\_layout.tsx](app/_layout.tsx)
3. Use typed routing: `router.push("/profile")`

### Creating a form
- Use `Input` component with controlled state (`useState`)
- Handle validation before calling Nhost hooks
- Show errors via `Alert.alert` (native pattern)
- Display loading state on Button during async operations

### Protected routes
- Check auth in layout with `useAuthenticationStatus()`
- Return `<Redirect href="/welcome" />` if not authenticated
- Show loading view while `isLoading === true`

## Gotchas
- React Native requires `className` on `<View>`, `<Text>`, `<TouchableOpacity>` (not on TextInput - use `style` or wrapper View)
- NativeWind classes don't support arbitrary values in quotes - extend theme in tailwind.config.js instead
- Expo Router's `useRouter()` must be called inside component (not in event handlers) - store router in variable
- StatusBar component from `expo-status-bar`, not `react-native`
