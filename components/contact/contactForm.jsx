const ContactForm = ({ onClose }) => {
    return <div style={{
        position: 'fixed',
        // 16px on phones, growing with the viewport up to 150px on large screens
        inset: 'clamp(16px, 10vh, 150px) clamp(16px, 10vw, 150px)',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'red'
    }}>
        <div>contact form</div>
        <div onClick={onClose}>x</div>
    </div>
}

export default ContactForm;