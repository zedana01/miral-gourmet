/**
 * Miral Gourmet - Interactive UI Scripts
 */

// Mobile navigation toggle
function toggleMobileMenu() {
  const menu = document.getElementById('navMenu');
  if (menu) {
    menu.classList.toggle('open');
  }
}

// Sticky header styling on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if (header) {
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }
});

// Quick add dish to booking notes
function quickAddToBooking(dishName) {
  const notesField = document.getElementById('bookingNotes');
  if (notesField) {
    const current = notesField.value.trim();
    if (current) {
      notesField.value = current + ' + طبق: ' + dishName;
    } else {
      notesField.value = 'الطلب المسبق للطبق: ' + dishName;
    }
    notesField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    notesField.focus();
    showToast('تمت إضافة طبق (' + dishName + ') إلى ملاحظات الحجز!');
  } else {
    // If on a page without the notes field, redirect to reservation page
    window.location.href = 'reservation.html?dish=' + encodeURIComponent(dishName);
  }
}

// Handle Table Reservation Submission
function handleBookingSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('[name="name"]')?.value || 'ضيف ميرال';
  const phone = form.querySelector('[name="phone"]')?.value || '';
  const date = form.querySelector('[name="date"]')?.value || '';
  const time = form.querySelector('[name="time"]')?.value || '';
  const guests = form.querySelector('[name="guests"]')?.value || '';
  const seating = form.querySelector('[name="seating"]')?.value || 'الصالة الرئيسية';
  const occasion = form.querySelector('[name="occasion"]')?.value || 'عشاء عام';
  const notes = form.querySelector('[name="notes"]')?.value || '';

  // Save to miral_data bookings
  try {
    const data = getMiralData();
    if (!data.bookings) data.bookings = [];
    const newBooking = {
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      name, phone, guests, date, time, seating, occasion, notes,
      status: "قيد الانتظار"
    };
    data.bookings.unshift(newBooking);
    saveMiralData(data);
  } catch(e) {
    console.error(e);
  }

  // Show Modal Confirmation
  const modal = document.getElementById('bookingConfirmationModal');
  const modalDesc = document.getElementById('modalBookingDesc');
  if (modalDesc) {
    modalDesc.innerHTML = `
      أهلاً بك يا <strong>${name}</strong>!<br>
      تم استلام طلب حجزكم بنجاح ليوم <strong>${date}</strong> في تمام الساعة <strong>${time}</strong> (${guests}).<br>
      تم إرسال إشعار التأكيد المباشر عبر الواتساب إلى رقمكم <strong>${phone}</strong>.
    `;
  }
  if (modal) modal.classList.add('show');
  form.reset();
}

function closeModal() {
  const modal = document.getElementById('bookingConfirmationModal');
  if (modal) modal.classList.remove('show');
}

// Simple Toast Notification
function showToast(msg) {
  const existing = document.getElementById('miralToast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.id = 'miralToast';
  toast.style.cssText = `
    position: fixed;
    bottom: 25px;
    left: 25px;
    background: #1e2227;
    color: #dfbe87;
    border: 1px solid rgba(197, 157, 63, 0.4);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    padding: 14px 22px;
    border-radius: 9999px;
    font-size: 14.5px;
    font-weight: 800;
    z-index: 999999;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: fadeIn 0.3s ease;
  `;
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-gold"></i> ` + msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
