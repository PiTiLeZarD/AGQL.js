const getStyles = (size) => ({
    outer: {
        textAlign: "center",
    },
    inner: {
        position: "relative",
        zIndex: -1,
        height: `${size / 1.24}px`,
        marginBottom: "20px",
    },
    background: {
        fontFamily: "montserrat, sans-serif",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        fontSize: `${size}px`,
        fontWeight: 900,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: `-${size / 18.66}px`,
        color: "#030005",
        textTransform: "uppercase",
        textShadow: "-1px -1px 0 #8400ff, 1px 1px 0 #ff005a",
        letterSpacing: `-${size / 11.2}px`,
    },
    foreground: {
        fontFamily: "montserrat, sans-serif",
        position: "absolute",
        left: 0,
        right: 0,
        top: `${size / 2.05}px`,
        fontSize: `${size / 5.33}px`,
        fontWeight: 700,
        color: "#fff",
        textTransform: "uppercase",
        textShadow: "0 2px 0 #8400ff",
        letterSpacing: `${size / 17.3}px`,
        margin: 0,
    },
});

const AgqlEffect = (props) => {
    const { size, background, foreground } = props;
    const styles = getStyles(size);

    return (
        <div style={styles.outer}>
            <div style={styles.inner}>
                <p style={styles.background}>{background}</p>
                <p style={styles.foreground}>{foreground}</p>
            </div>
        </div>
    );
};

AgqlEffect.defaultProps = {
    size: 224,
};

export default AgqlEffect;
