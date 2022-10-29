import styles from "./MapControls.module.scss";

interface MapControlsProps {
  isAnimated: boolean;
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
export const MapControls = ({
  isAnimated,
  setIsAnimated,
  step,
  setStep,
}: MapControlsProps) => (
  <div
    className={styles["map-controls-wrapper"]}
  >
    <button onClick={() => setIsAnimated((prev) => !prev)}>
      {isAnimated ? "Stop Animation" : "Start Animation"}
    </button>
    <button onClick={() => step > 1 && setStep((prev) => prev - 1)}>
      Speed -
    </button>
    <button onClick={() => step < 200 && setStep((prev) => prev + 1)}>
      Speed +
    </button>
  </div>
);
