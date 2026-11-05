import { SpinnerCircularFixed } from 'spinners-react';


export default function FetchMessage() {
  return (
    <div>
<SpinnerCircularFixed size={72} thickness={150} speed={100} color="#00AAD4" secondaryColor="#F7F7F7"/>
      <h2>Modal Title</h2>
      <p>This is some content inside the modal.</p>
    </div>
  );
}