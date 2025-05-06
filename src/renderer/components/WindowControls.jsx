import { XMarkIcon, ArrowsPointingOutIcon, MinusIcon } from '@heroicons/react/24/outline';
import '../../App.css';

export default function WindowControls() {
  return (
    <div
      className="window-controls"
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '4px 8px', // Match updated CSS
      }}
    >
      <button
        onClick={() => window.electronAPI.send('minimize-window')}
        className="control-button"
      >
        <MinusIcon className="h-3 w-3" />
      </button>
      <button
        onClick={() => window.electronAPI.send('maximize-window')}
        className="control-button"
      >
        <ArrowsPointingOutIcon className="h-3 w-3" />
      </button>
      <button
        onClick={() => window.electronAPI.send('close-window')}
        className="control-button close-button"
      >
        <XMarkIcon className="h-3 w-3" />
      </button>
    </div>
  );
}