import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { nearbyEquipment } from '@/data/mockData';
import { cn } from '@/lib/utils';

type Step = 1 | 2 | 3;

export default function BookEquipment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(2);
  const [paymentMode, setPaymentMode] = useState<'cash' | 'upi'>('cash');
  const [isBooked, setIsBooked] = useState(false);

  const equipment = nearbyEquipment.find(e => e.id === id);

  if (!equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>उपकरण नहीं मिला</p>
      </div>
    );
  }

  const totalPrice = equipment.pricePerHour * duration;

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('hi-IN', { weekday: 'short' }),
        num: date.getDate(),
      });
    }
    return days;
  };

  const handleConfirm = () => {
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-bounce-subtle mb-6">
          <CheckCircle2 className="h-24 w-24 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          बुकिंग सफल! ✅
        </h1>
        <p className="text-muted-foreground mb-6">
          आपकी बुकिंग {equipment.ownerName} को भेज दी गई है।<br />
          वे जल्द ही आपसे संपर्क करेंगे।
        </p>
        
        <div className="w-full max-w-sm bg-card rounded-2xl p-4 mb-6 text-left">
          <h3 className="font-bold mb-2">{equipment.nameHindi}</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(selectedDate).toLocaleDateString('hi-IN', { 
                day: 'numeric', 
                month: 'long' 
              })} - {selectedTime}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {duration} घंटे
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {equipment.location}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
            <span className="text-muted-foreground">कुल राशि:</span>
            <span className="text-xl font-bold text-primary">₹{totalPrice}</span>
          </div>
        </div>

        <div className="flex gap-3 w-full max-w-sm">
          <Button
            variant="outline"
            className="flex-1 h-14"
            onClick={() => window.location.href = `tel:${equipment.ownerPhone}`}
          >
            <Phone className="h-5 w-5 mr-2" />
            कॉल करें
          </Button>
          <Button
            className="flex-1 h-14 bg-primary"
            onClick={() => navigate('/bookings')}
          >
            बुकिंग देखें
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold">बुकिंग करें</h1>
            <p className="text-sm text-primary-foreground/80">{equipment.nameHindi}</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                currentStep >= step 
                  ? "bg-primary-foreground text-primary" 
                  : "bg-primary-foreground/20 text-primary-foreground/50"
              )}>
                {step}
              </div>
              {step < 3 && (
                <div className={cn(
                  "w-12 h-1 mx-1 rounded",
                  currentStep > step 
                    ? "bg-primary-foreground" 
                    : "bg-primary-foreground/20"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-32">
        {/* Step 1: Select Date */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold mb-4">📅 तारीख चुनें</h2>
            
            <div className="grid grid-cols-4 gap-3 mb-6">
              {getNextDays().map((day) => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  className={cn(
                    "p-4 rounded-2xl text-center transition-all",
                    selectedDate === day.date
                      ? "bg-primary text-primary-foreground scale-105"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <span className="block text-xs mb-1">{day.day}</span>
                  <span className="block text-xl font-bold">{day.num}</span>
                </button>
              ))}
            </div>

            <h2 className="text-lg font-bold mb-4">🕐 समय चुनें</h2>
            
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "p-4 rounded-xl text-center font-medium transition-all",
                    selectedTime === time
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Duration */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold mb-4">⏱️ कितने घंटे?</h2>
            
            <div className="grid grid-cols-4 gap-3 mb-8">
              {[1, 2, 3, 4, 5, 6, 8, 10].map((hours) => (
                <button
                  key={hours}
                  onClick={() => setDuration(hours)}
                  className={cn(
                    "p-4 rounded-xl text-center font-bold text-lg transition-all",
                    duration === hours
                      ? "bg-primary text-primary-foreground scale-105"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {hours}
                </button>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">प्रति घंटा:</span>
                <span className="font-medium">₹{equipment.pricePerHour}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">अवधि:</span>
                <span className="font-medium">{duration} घंटे</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="font-bold">कुल राशि:</span>
                <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold mb-4">💰 भुगतान कैसे करेंगे?</h2>
            
            <div className="space-y-3 mb-8">
              <button
                onClick={() => setPaymentMode('cash')}
                className={cn(
                  "w-full p-5 rounded-2xl flex items-center gap-4 transition-all",
                  paymentMode === 'cash'
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                )}
              >
                <span className="text-3xl">💵</span>
                <div className="text-left">
                  <h3 className="font-bold">नकद</h3>
                  <p className={cn(
                    "text-sm",
                    paymentMode === 'cash' ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    काम पूरा होने पर भुगतान करें
                  </p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMode('upi')}
                className={cn(
                  "w-full p-5 rounded-2xl flex items-center gap-4 transition-all",
                  paymentMode === 'upi'
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                )}
              >
                <span className="text-3xl">📱</span>
                <div className="text-left">
                  <h3 className="font-bold">UPI</h3>
                  <p className={cn(
                    "text-sm",
                    paymentMode === 'upi' ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    PhonePe, GPay, Paytm से भुगतान करें
                  </p>
                </div>
              </button>
            </div>

            {/* Summary */}
            <div className="bg-card rounded-2xl p-4">
              <h3 className="font-bold mb-3">बुकिंग विवरण</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p className="flex items-center gap-2">
                  <span className="text-lg">🚜</span>
                  {equipment.nameHindi}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-lg">👨‍🌾</span>
                  {equipment.ownerName}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(selectedDate).toLocaleDateString('hi-IN', { 
                    day: 'numeric', 
                    month: 'long' 
                  })} - {selectedTime}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {duration} घंटे
                </p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="font-bold">कुल राशि:</span>
                <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              variant="outline"
              className="flex-1 h-14"
              onClick={() => setCurrentStep((currentStep - 1) as Step)}
            >
              पीछे जाएं
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button
              className="flex-1 h-14 bg-primary"
              onClick={() => setCurrentStep((currentStep + 1) as Step)}
              disabled={
                (currentStep === 1 && (!selectedDate || !selectedTime))
              }
            >
              आगे बढ़ें
            </Button>
          ) : (
            <Button
              className="flex-1 h-14 bg-accent hover:bg-accent/90"
              onClick={handleConfirm}
            >
              बुकिंग पक्की करें ✓
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
