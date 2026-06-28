import { Image } from "react-native";
interface AvatarProps {
  name: string;
  size?: number;
}

export default function Avatar({ name, size = 40 }: AvatarProps) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&bold=true`;
  return (
    <Image
      source={{ uri: avatarUrl }}
      style={{ width: size, height: size, borderRadius: size }}
      className="rounded-full"
    />
  );
}
