import React, { useState } from "react";
import { FiLock, FiSave, FiShield } from "react-icons/fi";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import Section from "../ui/Section";
import ToggleSection from "../ui/ToggleSection";
import ErrorAlert from "../ui/ErrorAlert";
import SuccessAlert from "../ui/SuccessAlert";

const SecuritySettings = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const validatePasswordForm = () => {
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordError("All fields are required");
      return false;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords don't match");
      return false;
    }

    return true;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!validatePasswordForm()) return;

    setIsChangingPassword(true);

    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordSuccess("Password successfully changed");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 1500);
  };

  const toggleTwoFactor = () => {
    // In a real app, this would open 2FA setup flow
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <div>
      <div className="space-y-12">
        {/* Change Password Section */}
        <Section title="Change Password" icon={FiLock} noBorder>
          <form onSubmit={handlePasswordSubmit} className="max-w-lg">
            {passwordError && <ErrorAlert message={passwordError} />}
            {passwordSuccess && <SuccessAlert message={passwordSuccess} />}

            <FormInput
              label="Current Password"
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
            />

            <FormInput
              label="New Password"
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              description="Password must be at least 8 characters"
            />

            <FormInput
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
            />

            <Button type="submit" icon={FiSave} isLoading={isChangingPassword}>
              Change Password
            </Button>
          </form>
        </Section>

        {/* Two-Factor Authentication */}
        <Section className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <ToggleSection
            icon={FiShield}
            title="Two-Factor Authentication"
            description="Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to sign in."
            enabled={twoFactorEnabled}
            onChange={toggleTwoFactor}
            actionButton={
              <Button
                variant="outline"
                onClick={() => console.log("Open 2FA setup/management")}
              >
                {twoFactorEnabled
                  ? "Manage 2FA Settings"
                  : "Set Up Two-Factor Authentication"}
              </Button>
            }
          />
        </Section>
      </div>
    </div>
  );
};

export default SecuritySettings;
