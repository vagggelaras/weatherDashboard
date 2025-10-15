export default function Card({
    title,
    value,
    unit,
    status,
    icon,
    className = ''
}) {
    return (
        <div className={`card ${className}`}>
            {/* Header */}
            <div className="card-header">
                {icon && <div className="card-icon">{icon}</div>}
                <h3 className="card-title">{title}</h3>
            </div>

            {/* Content */}
            <section className="card-body">
                <div className="card-value-container">
                    <span className="card-value">{value}</span>
                    {unit && <span className="card-unit">{unit}</span>}
                </div>
                {status && (
                    <div className="card-status">
                        {status}
                    </div>
                )}
            </section>
        </div>
    )
  }