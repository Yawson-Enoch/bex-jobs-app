import ProfileUpdateForm from '~/components/dashboard/profile-update-form';

export default function ProfilePage() {
  return (
    <div className="grid h-full content-center">
      <title>Profile</title>
      <div className="space-y-3 rounded-lg border bg-background/70 p-3 md:space-y-6 md:p-6">
        <h3>Profile</h3>
        <ProfileUpdateForm />
      </div>
    </div>
  );
}
