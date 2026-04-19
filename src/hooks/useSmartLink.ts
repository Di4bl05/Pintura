export const useSmartLink = () => {
  const handlePhoneClick = (phoneNumber: string) => (e: React.MouseEvent) => {
    
    const isPC = !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isPC) {
      e.preventDefault();
      
      const cleanNumber = phoneNumber.replace(/\D/g, ""); 
      
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=${cleanNumber}&type=phone_number&app_absent=0`;
      
      window.open(whatsappUrl, "_blank");
    }
    
  };

  return { handlePhoneClick };
};