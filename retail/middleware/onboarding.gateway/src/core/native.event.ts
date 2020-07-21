import { Logger } from '@nestjs/common';

class NativeEvent {
	public cluster (_cluster): void {
		// Catch cluster listening event...
		_cluster.on('listening', (worker) =>
			Logger.log(`Server :: Cluster with ProcessID '${worker.process.pid}' Connected!`)
		);

		// Catch cluster once it is back online event...
		_cluster.on('online', (worker) =>
			Logger.log(`Server :: Cluster with ProcessID '${worker.process.pid}' has responded after it was forked! `)
		);

		// Catch cluster disconnect event...
		_cluster.on('disconnect', (worker) =>
			Logger.log(`Server :: Cluster with ProcessID '${worker.process.pid}' Disconnected!`)
		);

		// Catch cluster exit event...
		_cluster.on('exit', (worker, code, signal) => {
			Logger.log(`Server :: Cluster with ProcessID '${worker.process.pid}' is Dead with Code '${code}, and signal: '${signal}'`);
			// Ensuring a new cluster will start if an old one dies
			_cluster.fork();
		});
	}

	public process (): void {
		// Catch the Process's uncaught-exception
		process.on('uncaughtException', (exception) =>
			Logger.log(exception.stack)
		);

		// Catch the Process's warning event
		process.on('warning', (warning) =>
			Logger.log(warning.stack)
		);

		// Catch the Process's unhandled-rejection
		process.on('unhandledRejection', (reason, promise) => {
			Logger.log(reason);
			console.log(promise);
    });
	}
}

export default new NativeEvent;