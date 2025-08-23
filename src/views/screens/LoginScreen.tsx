import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { colors, dimensions } from '../../utils/resources';
import CustomTextComponent from '../../components/CustomTextComponent';
import LogoSvg from '../../assets/svgs/logo.svg';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('waqardriver@yopmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Mock login - replace with actual API call
    dispatch(
      loginSuccess({
        user: { id: 1, email, name: 'Driver Name' },
        token: 'mock-token',
      }),
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <LogoSvg />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <CustomTextComponent
          variant="title"
          align="center"
          style={styles.welcomeText}
        >
          ~ Welcome Back ~
        </CustomTextComponent>

        <CustomTextComponent
          variant="body"
          align="center"
          style={styles.loginInstruction}
        >
          Please login to continue using the app
        </CustomTextComponent>

        <View style={styles.inputContainer}>
          <CustomTextComponent variant="body" style={styles.inputLabel}>
            Email*
          </CustomTextComponent>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email"
          />

          <CustomTextComponent variant="body" style={styles.inputLabel}>
            Password*
          </CustomTextComponent>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.eyeIcon}
            >
              <CustomTextComponent variant="body">
                {showPassword ? '👁️' : '🙈'}
              </CustomTextComponent>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <CustomTextComponent
            variant="body"
            color={colors.primary}
            style={styles.forgotPasswordText}
          >
            Forgot Password?
          </CustomTextComponent>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <CustomTextComponent variant="button">Login</CustomTextComponent>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
  },
  appName: {
    fontSize: 28,
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: dimensions.spacing.xl,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
    color: colors.textPrimary,
  },
  loginInstruction: {
    marginBottom: 40,
    color: colors.textSecondary,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 8,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.white,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingRight: 50,
    backgroundColor: colors.white,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
  },
  loginButton: {
    height: 55,
    backgroundColor: colors.primary,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default LoginScreen;
