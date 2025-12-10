import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { constants } from "../constants";

interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

const usePinFileToIPFS = () =>
  useMutation({
    mutationFn: async (params: { image: File; name: string }): Promise<PinataResponse> => {
      const formData = new FormData();
      formData.append("file", params.image);

      // Métadonnées Pinata (nom du fichier)
      const pinataMetadata = JSON.stringify({
        name: params.name,
      });
      formData.append("pinataMetadata", pinataMetadata);

      const response = await axios.post<PinataResponse>(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer ${constants.pinataAPIKey}`,
          },
        }
      );

      return response.data;
    },
  });

export default usePinFileToIPFS;

