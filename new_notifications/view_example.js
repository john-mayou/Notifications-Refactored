import notificationConfig from './_root';

function ViewExample() {

    notifications = null // get notification data

    const dispatchActions = (array, id) => {
        array.forEach(action => dispatch(action))
        completeNotification(id)
    }

    const completeNotification = (id) => {
        dispatch({type: "COMPLETE_NOTIFICATION", payload: id})
    }

    return (
        <>
            {notifications.map((n) => {
                attrs = notificationConfig[n.type](n)
                
                return (
                    <>
                        <p>{attrs.message}</p>

                        {attrs.actions ? (
                            <>
                                {/* accept */}
                                <button onClick={() => dispatchActions(attrs.actions.accept.dispatch, n.id)}>
                                    {attrs.actions.accept.button_text}
                                </button>

                                {/* reject */}
                                <button onClick={() => dispatchActions(attrs.actions.reject.dispatch, n.id)}>
                                    {attrs.actions.reject.button_text}
                                </button>
                            </>

                        ): (
                            // just complete
                            <button onClick={() => completeNotification(n.id)}>
                                {attrs.actions.accept.button_text}
                            </button>
                        )}
                    </>
                )
            })}
        </>
    )
}

export default ViewExample;

