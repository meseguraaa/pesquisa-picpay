import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import Cropper, { Area } from "react-easy-crop";

/** ===== Helpers para crop ===== */
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, crop: Area) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return canvas.toDataURL("image/jpeg");
}

type ImageCropFieldProps = {
  focusClassName: string;
  onValidChange?: (valid: boolean) => void;
};

export default function ImageCropField({
  focusClassName,
  onValidChange,
}: ImageCropFieldProps) {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [imagemLabel, setImagemLabel] = useState("");
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isValid, setIsValid] = useState(false);

  // Crop small (326x217)
  const [cropSmall, setCropSmall] = useState({ x: 0, y: 0 });
  const [zoomSmall, setZoomSmall] = useState(1);
  const [croppedAreaSmall, setCroppedAreaSmall] = useState<Area | null>(null);
  const [croppedSmallUrl, setCroppedSmallUrl] = useState<string | null>(null);

  // Crop large (1134x189)
  const [cropLarge, setCropLarge] = useState({ x: 0, y: 0 });
  const [zoomLarge, setZoomLarge] = useState(1);
  const [croppedAreaLarge, setCroppedAreaLarge] = useState<Area | null>(null);
  const [croppedLargeUrl, setCroppedLargeUrl] = useState<string | null>(null);

  const handleClickAdicionarImagem = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // sempre que trocar a imagem, volta pra "não válido" até confirmar recorte
    setIsValid(false);
    onValidChange?.(false);

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setOriginalImage(result);

      setCropSmall({ x: 0, y: 0 });
      setZoomSmall(1);
      setCroppedAreaSmall(null);
      setCroppedSmallUrl(null);

      setCropLarge({ x: 0, y: 0 });
      setZoomLarge(1);
      setCroppedAreaLarge(null);
      setCroppedLargeUrl(null);

      setCropDialogOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropCompleteSmall = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaSmall(croppedAreaPixels);
  };

  const onCropCompleteLarge = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaLarge(croppedAreaPixels);
  };

  const handleConfirmarRecortes = async () => {
    if (!originalImage || !croppedAreaSmall || !croppedAreaLarge) return;

    const small = await getCroppedImg(originalImage, croppedAreaSmall);
    const large = await getCroppedImg(originalImage, croppedAreaLarge);

    if (small) setCroppedSmallUrl(small);
    if (large) setCroppedLargeUrl(large);

    setImagemLabel("Imagem recortada com sucesso");
    setIsValid(true);
    onValidChange?.(true);

    setCropDialogOpen(false);
  };

  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="imagem">
          Imagem <span className="text-red-500">*</span>
        </Label>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <Input
            id="imagem"
            placeholder="Envie sua imagem de capa"
            className={`${focusClassName} flex-1 ${
              isValid ? "border-[#21C25E]" : ""
            }`}
            value={imagemLabel}
            readOnly
          />

          <Button
            type="button"
            className="gap-2 whitespace-nowrap"
            onClick={handleClickAdicionarImagem}
          >
            Adicionar <Plus size={16} />
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <p className="text-[11px] text-zinc-500">
          A mesma imagem será usada na HOME e INTERNAMENTE.
        </p>

        {isValid && (
          <div className="flex flex-wrap gap-4 mt-2">
            {croppedSmallUrl && (
              <div>
                <p className="text-[11px] text-zinc-500 mb-1">
                  Pré-visualização 326×217
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={croppedSmallUrl}
                  alt="Corte 326x217"
                  className="rounded-md border max-w-[200px]"
                />
              </div>
            )}
            {croppedLargeUrl && (
              <div>
                <p className="text-[11px] text-zinc-500 mb-1">
                  Pré-visualização 1134×189
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={croppedLargeUrl}
                  alt="Corte 1134x189"
                  className="rounded-md border max-w-[260px]"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de recorte */}
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle>Recortar imagem</DialogTitle>
          </DialogHeader>

          {originalImage && (
            <Tabs defaultValue="small" className="mt-4">
              <TabsList className="mb-4">
                <TabsTrigger value="small">Imagem HOME</TabsTrigger>
                <TabsTrigger value="large">Imagem INTERNA</TabsTrigger>
              </TabsList>

              <TabsContent value="small" className="space-y-2">
                <div className="relative w-full h-[450px] bg-black/60 rounded-md overflow-hidden">
                  <Cropper
                    image={originalImage}
                    crop={cropSmall}
                    zoom={zoomSmall}
                    aspect={326 / 217}
                    onCropChange={setCropSmall}
                    onZoomChange={setZoomSmall}
                    onCropComplete={onCropCompleteSmall}
                  />
                </div>
              </TabsContent>

              <TabsContent value="large" className="space-y-2">
                <div className="relative w-full h-[450px] bg-black/60 rounded-md overflow-hidden">
                  <Cropper
                    image={originalImage}
                    crop={cropLarge}
                    zoom={zoomLarge}
                    aspect={1134 / 189}
                    onCropChange={setCropLarge}
                    onZoomChange={setZoomLarge}
                    onCropComplete={onCropCompleteLarge}
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter className="mt-4 flex justify-between gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setCropDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirmarRecortes}
              disabled={
                !originalImage || !croppedAreaSmall || !croppedAreaLarge
              }
            >
              Confirmar recortes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
