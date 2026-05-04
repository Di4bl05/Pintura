import { useCallback } from "react";

export const useSmartLink = () => {
  const handlePhoneClick = useCallback((phoneNumber: string) => (e: React.MouseEvent) => {
    const isPC = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isPC) {
      e.preventDefault();
      const cleanNumber = phoneNumber.replace(/\D/g, "");
      const finalNumber = cleanNumber.startsWith("1") ? cleanNumber : `1${cleanNumber}`;
      const whatsappUrl = `https://wa.me/${finalNumber}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  }, []);

  return { handlePhoneClick };
};