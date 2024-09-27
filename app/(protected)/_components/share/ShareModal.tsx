// components/ShareModal.tsx
import { Copy, XIcon } from "lucide-react";
import {
  WhatsappShareButton,
  TelegramShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  WhatsappIcon,
  TelegramIcon,
  FacebookMessengerIcon,
  EmailIcon,
} from "next-share";
import { SHARE_MODAL } from "../../customer/(home)/constants";

interface ShareModalProps {
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  // TODO: retrieve the referral code from the backend
  const referralCode = "https://yourwebsite.com";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg text-center relative">
        {/* Title & Close Button */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-lg font-semibold">{SHARE_MODAL.TITLE}</div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-around items-center mb-4">
          <div className="flex flex-col items-center">
            <WhatsappShareButton url={referralCode}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <span className="mt-2 text-sm font-medium text-gray-700">
              {SHARE_MODAL.WHATSAPP}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <TelegramShareButton url={referralCode}>
              <TelegramIcon size={40} round />
            </TelegramShareButton>
            <span className="mt-2 text-sm font-medium text-gray-700">
              {SHARE_MODAL.TELEGRAM}
            </span>
          </div>

          <div className="flex flex-col items-center">
            {/* TODO: find our what is appID */}
            <FacebookMessengerShareButton
              url={referralCode}
              appId="YOUR_FACEBOOK_APP_ID"
            >
              <FacebookMessengerIcon size={40} round />
            </FacebookMessengerShareButton>
            <span className="mt-2 text-sm font-medium text-gray-700">
              {SHARE_MODAL.MESSENGER}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <EmailShareButton url={referralCode}>
              <EmailIcon size={40} round />
            </EmailShareButton>
            <span className="mt-2 text-sm font-medium text-gray-700">
              {SHARE_MODAL.EMAIL}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(referralCode)}
          className="flex items-center justify-center gap-2 text-lg font-medium"
        >
          <Copy className="h-6 w-6" />
          {SHARE_MODAL.COPY}
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
