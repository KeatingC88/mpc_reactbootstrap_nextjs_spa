let timed_interval: NodeJS.Timeout | null = null

export const Delay_Function_Execution = (time: number, function_to_be_executed_after_timer_runs_out: () => void): void => {

    if (timed_interval) {
        clearInterval(timed_interval)
    }

    timed_interval = setInterval(() => {

        const now = Date.now()
        const distance = time - now
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        if (seconds === 0) {
            function_to_be_executed_after_timer_runs_out()
        }

        if (distance < 0) {
            clearInterval(timed_interval!)
            timed_interval = null
        }

    }, 1000)
}