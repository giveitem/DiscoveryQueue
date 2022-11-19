function Footer() {
    const footerStyle = { textAlign: 'left' }
    return (
        <div>
            <footer class="footer mt-auto py-3 bg-dark">
                <div class="container">
                    <span class="text-white-50" style={footerStyle}>
                        &copy; Data-Geeks 2022
                    </span>
                </div>
            </footer >
        </div>
    )
}


export default Footer;